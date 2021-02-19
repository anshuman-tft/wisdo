import {injectable} from "inversify";
// @ts-ignore
import {I18n} from "i18n";
import * as path from "path";

@injectable()
export class LocaleUtil {
    private i18n;

    constructor() {
        this.i18n = new I18n({
            directory: path.join(__dirname, "../../locales"),
        });
    }

    // translate
    translate = (text: string, locale: string): string => {

        return this.i18n.__({phrase: text, locale});
    };
}

/**
 * Direction of use
 *
 * import the LocalUtils and
 * inject LocalUtils in any file you want to add translation into
 * @inject(Symbols.LocaleUtil) private localeUtil: LocaleUtil
 *
 * use translation like this
 * this.localeUtil.translate('healthy', 'en')
 */