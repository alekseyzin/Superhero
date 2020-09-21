import {FormControl, FormGroup} from '@angular/forms';
import {PasswordUniqErrors} from './interfaces';

interface Validator {
  [key: string]: boolean
}

export class FormValidators {

  static checkMissingLetters(control: FormControl): Validator {
    const regex = new RegExp(/[^a-zA-Z-\s]/);

    if (regex.test(control.value)) {
      return {isMissingLetters: true};
    }

    return null;
  }

  static checkNameCase(control: FormControl): Validator {
    const regex = new RegExp(/^[A-Z]{1}[a-z]*(\s|-)?[A-Z]{1}[a-z]*$/);

    if (!regex.test(control.value)) {
      return {isInvalidNameCase: true};
    }

    return null;
  }

  static checkEmailDomain(control: FormControl): Validator {
    if (FormValidators.isValidEmailDomain(control)) {
      return {isInvalidEmailDomain: true};
    }

    return null;
  }

  static isValidEmailDomain(control: FormControl): boolean {
    const domainReg = new RegExp(/@[a-z]*.(com|net|org|co|us)$/);
    const lengthReg = new RegExp(/@(\S){3,5}$/);

    return !domainReg.test(control.value) || !lengthReg.test(control.value);
  }

  static checkDotsLimit(control: FormControl): Validator {
    const dotsLimitReg = new RegExp(/^(\w*\.)?(\w*\.)?(\w*\.)?\w*@/);

    if (!dotsLimitReg.test(control.value)) {
      return {isInvalidDotsLimit: true};
    }

    return null;
  }

  static checkPasswordFormat(control: FormControl): Validator {
    const passwordFormatReg = new RegExp(/^(?=.*[$%.&!-]+)(?=.*[A-Z]+)(?=.*\d+).*$/);

    if (!passwordFormatReg.test(control.value)) {
      return {isInvalidPasswordFormat: true};
    }

    return null;
  }

  static checkUniq(inputName: string): any {
    return function(control: any): Validator {
      const validators = {
        name: (): Validator => ({isIncludesName: FormValidators.isIncludesName(control)}),
        email: (): Validator => ({isIncludesEmail: FormValidators.includesEmail(control)})
      }

      return validators[inputName]()
    };
  }

  static isIncludesName(control: any): boolean {
    const name = control.parent?.controls.name.value;
    let isIncludesName = false;

    if (name) {
      const nameLikeArray = FormValidators.getNameLikeArray(name)
      const inputValLower = control.value.toLowerCase()

      isIncludesName = nameLikeArray.some((word: string) => inputValLower.includes(word.toLowerCase()))
    }

    return isIncludesName;
  }

  static includesEmail(control: any): boolean {
    const email = control.parent?.controls.email.value;
    const firstPartEmailLower = email?.split('@')[0].toLowerCase()
    const isIncludesEmail = email ? control.value?.toLowerCase().includes(firstPartEmailLower) : false;

    return isIncludesEmail;
  }

  static getNameLikeArray(name: string): Array<string> {
    let nameSplit: string[];
    if (name.includes('-')) {
      nameSplit = name.split('-');
    } else if (name.trim().includes(' ')) {
      nameSplit = name.trim().split(' ');
    } else {
      const camelCaseReg = new RegExp(/([a-z])([A-Z])/g);
      nameSplit = name.replace(camelCaseReg, '$1 $2').toLowerCase().split(' ');
    }

    return nameSplit;
  }

  static checkSearchInput(control: FormControl): Validator {
    const onlyLettersReg = new RegExp(/^[a-zA-Z]+$/);

    if (!onlyLettersReg.test(control.value)) {
      return {isInvalidSearch: true};
    }

    return null;
  }
}


