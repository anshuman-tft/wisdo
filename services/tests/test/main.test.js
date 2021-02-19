const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Sequelize = require('sequelize');

chai.use(chaiAsPromised);
chai.use(require('chai-iso8601')());

const axios = require('axios');

const config = require('./config');
const consts = require('./consts');

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

let sequelize = new Sequelize(config.DB_ENDPOINT, {
  dialectOptions: {
    multipleStatements: true,
  },
});
let isDbInitialized = false;

function importTest(name, path) {
  describe(name, function () {
    require(path);
  });
}

describe("NES test", () => {
  before(async function () {
    this.timeout(60000); // allow enough time for services to become ready

    const retryOperation = (operation, delay, times) =>
      new Promise((resolve, reject) => {
        return operation()
          .then(resolve)
          .catch(reason => {
            if (times - 1 > 0) {
              console.log(`opertaion failed, retrying, ${times - 1} retries left...`);
              return wait(delay)
                .then(retryOperation.bind(null, operation, delay, times - 1))
                .then(resolve)
                .catch(reject);
            }
            return reject(reason);
          });
      });

    const attemptDbConnection = async function () {
      try {
        console.log(`Trying to connect to DB...`);

        await sequelize.sync();
        return {isConnectedToDb: true};
      } catch (error) {
        console.log(`DB Error: ${error.message}`);
        throw error;
      }
    };

    const attemptServerConnection = async function () {
      const url = `${config.SERVER_URL}/api/v1/health`;

      console.log(`Trying to connect to server...${url}`);
      try {
        const response = await axios({
          method: 'get',
          url,
        });

        console.log(`Server available, status: ${response.data}`);
        return {isServerAvailable: true};
      } catch (error) {
        console.log(`Server Error: ${error.message}`);
        throw error;
      }
    };

    const attemptDbInitialization = async function () {
      try {
        console.log(`Trying to insert test data into DB...`);
        await sequelize.query(
          `
        `,
          {
            logging: false,
            raw: true,
            type: sequelize.QueryTypes.UPSERT,
          },
        );

        console.log('DB initialized');
        return {isDbInitialized: true};
      } catch (error) {
        console.log(`DB Error: ${error.message}`);
        throw error;
      }
    };

    return new Promise(async function (resolve, reject) {
      try {
        let res = await retryOperation(attemptServerConnection, 10000, 15);
        if (!res) {
          reject(new Error('Cant connect to server'));
        }

        res = await retryOperation(attemptDbConnection, 5000, 5);
        console.log(`DB connection status: ${JSON.stringify(res)}`);
        if (!res) {
          reject(new Error('Cant connect to DB'));
        }

        res = await retryOperation(attemptDbInitialization, 2000, 2);
        console.log(`DB initialization status: ${JSON.stringify(res)}`);
        if (!res) {
          reject(new Error('Cant initialize the DB'));
        }
        isDbInitialized = true;
        resolve();
      } catch (error) {
        console.log(error.message);
        reject(error);
      }
    });
  });

  importTest("User", './routes/api/user/user.test');

  after(async function () {
    return new Promise(async function (resolve, reject) {
      if (!isDbInitialized) {
        console.log('DB was not initialized, skipping cleanup, cycle ended.');
        resolve();
        return;
      }
      await sequelize.query(
        `
      `,
        {
          logging: false,
          raw: true,
          type: sequelize.QueryTypes.DELETE,
        },
      );

      console.log('DB cleanup complete, cycle ended.');
      resolve();
      console.log("after all tests");
    });
  });
});