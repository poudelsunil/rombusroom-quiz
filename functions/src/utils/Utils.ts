import ValidationError from "./ValidationError";
import AppConstraints from "../constraints/AppConstraints";

export default class Utils {

    static trim(toTrim: any): string {
        // return toTrim;
        return Utils.isEmpty(toTrim) ? '' : ((toTrim + "").trim());
    }

    static zeroIfNaN(num: number): number {
        return Utils.isEmptyUndefinedNullOrInvalidNumber(num) ? 0 : num;
    }

    static formatNumber(num: number): number {
        return +num.toFixed(2);
    }

    static formatDecimalSeparator(num: number): number | string {
        return num.toLocaleString("pt-BR");
    }

    static isEmpty(toCheck: any): boolean {
        return this.isUndefined(toCheck) || toCheck === null || toCheck === '' || (typeof toCheck === 'string' && toCheck.trim() === '');
    }

    static isUndefined(toCheck: any): boolean {
        return toCheck === undefined || typeof toCheck === 'undefined';
    }

    static isUndefinedOrNull(toCheck: any): boolean {
        return this.isUndefined(toCheck) || toCheck === null;
    }

    static isEmptyUndefinedNullOrInvalidNumber(toCheck: any): boolean {
        return Utils.isEmpty(toCheck) || isNaN(toCheck);
    }

    static getNullIfUndefined(value: any): any | null {
        return (typeof value === 'undefined' || value === undefined) ? null : value;
    }

    static removeDuplicates(a: string[]): string[] {
        return Array.from(new Set(a));
    }

    static isTextExceededMaxLength(textToValidate: string, maxLength?: number): boolean {
        const _maxLength: number = Utils.isEmpty(maxLength) || !maxLength ? 255 : maxLength;

        if (Utils.isEmpty(textToValidate)) {
            return false;

        }
        return textToValidate.length > _maxLength;
    }

    static isTextContainNewLine(textToValidate: string): boolean {

        if (Utils.isEmpty(textToValidate)) {
            return false;

        }

        return ('' + textToValidate).includes("\n") || ('' + textToValidate).includes("\r") || ('' + textToValidate).includes("\\n");
    }

    static validateEmail(email: string): boolean {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    static isValueIncludedInArray(fieldValue: any, values: any[]) {

        for (const value of values) {
            if (Utils.trim(fieldValue) === Utils.trim(value)) {
                return true;
            }
        }
        return false;
    }


    static prepareFieldHeaderForReport(_fieldName: string, label: string): string {

        const fieldName = Utils.isEmpty(_fieldName) ? "" : _fieldName;

        let processedFieldName: string = fieldName;

        if (!Utils.isEmpty(label)) {
            processedFieldName = processedFieldName + " (" + label + ")";
        }

        return processedFieldName;
    }

    static extractProperFieldNameFromFieldHeaderOfReport(formattedFieldName: string): string {

        if (Utils.isEmpty(formattedFieldName)) {
            return "";
        }

        return Utils.trim(formattedFieldName.split("(")[0]);
    }

    static isTrue(toCheck: any): boolean {
        return !Utils.isEmpty(toCheck) && (toCheck === true || toCheck === "TRUE" || toCheck === "true" || toCheck === 1);
    }

    static isFalse(toCheck: any): boolean {
        return !Utils.isEmpty(toCheck) &&
            (toCheck === false || toCheck === "FALSE" || toCheck === "false" || toCheck === 0);
    }

    static getKeySize(toCheck: any): number {
        let counter: number = 0;
        for (const _ in toCheck) {
            counter++;
        }
        return counter;
    }


    static prepareHttpErrorResponse(res: any, error: Error) {
        console.log(error.stack);
        if (error instanceof ValidationError) {
            return res.status(400).send(error.message);
        } else {
            return res.status(500).send("Server error, please contact our support team : " + error.message);
        }
    }


    static isValidEmail(email: string) {
        return !Utils.isEmpty(email) && AppConstraints.VALID_EMAIL_REGEX.test(email)
    }



}