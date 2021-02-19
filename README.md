## Run make command from root directory

```
make build
```
```
make run
```

## Insert records in DB

```
-- ----------------------------
-- Records of countries
-- ----------------------------
INSERT INTO countries VALUES ('35bcf921-c79a-456e-bb64-ef8d61d25fb0', 'India', '2021-02-11 16:12:10', '2021-02-11 16:12:15', null);
INSERT INTO countries VALUES ('bae8f57f-f27a-45ac-b2ed-d554367586c4', 'Israel', '2021-02-11 16:14:57', '2021-02-11 16:15:00', null);

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO tags VALUES ('1417b376-5a4f-4331-b5c6-04448ceb8a3f', 'sport', '2021-02-11 16:12:10', '2021-02-11 16:12:15', null);
INSERT INTO tags VALUES ('1cb23ef8-c8f0-47c8-af26-e3ae5ff3dd2b', 'friends', '2021-02-11 16:14:57', '2021-02-11 16:15:00', null);
INSERT INTO tags VALUES ('44b0564b-e98a-48dd-b30e-666469b70423', 'pets', '2021-02-11 16:14:23', '2021-02-11 16:14:26', null);
INSERT INTO tags VALUES ('493ec4b2-6de1-4d51-9976-0507f9429566', 'movies', '2021-02-11 16:13:48', '2021-02-11 16:13:52', null);
INSERT INTO tags VALUES ('c08fee63-8d1c-4c46-906a-492bb5d9a81e', 'family', '2021-02-11 16:12:52', '2021-02-11 16:12:56', null);

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO roles VALUES ('68c97fdf-c5c0-43de-a8db-73e945127199', 'super moderator', 'sm', '2021-02-11 16:16:44', '2021-02-11 16:16:48', null);
INSERT INTO roles VALUES ('95c68977-d3b0-4088-8429-257cebd737c5', 'moderator', 'm', '2021-02-11 16:16:15', '2021-02-11 16:16:18', null);

-- ----------------------------
-- Records of communities
-- ----------------------------
INSERT INTO communities VALUES ('c90cc19a-3b67-4f72-8d5e-1181a4e7f849', 'lonliness', null, '2021-02-15 12:16:44', '2021-02-15 12:16:48', null);
INSERT INTO communities VALUES ('c90cc19a-3b67-4f72-8d5e-1181a4e7f848', 'culture', null, '2021-02-15 12:16:44', '2021-02-15 12:16:48', null);
```

