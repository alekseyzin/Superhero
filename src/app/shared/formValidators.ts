import {FormControl} from '@angular/forms';
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

  static checkPasswordUniq(control: FormControl): PasswordUniqErrors | null {
    let errors: PasswordUniqErrors | null = {}
    const email = control.parent?.controls.email.value
    const name = control.parent?.controls.name.value
    let isIncludesName = false
    const isIncludesEmail = email ? control.value?.toLowerCase().includes(email.split('@')[0].toLowerCase()) : false;

    if (name) {
      FormValidators.getNameLikeArray(name).forEach( name => {
        isIncludesName = isIncludesName ? true : control.value.toLowerCase().includes(name.toLowerCase())
      })
    }
    if (isIncludesEmail) errors.isIncludesEmail = true
    if (isIncludesName) errors.isIncludesName = true

    return (JSON.stringify(errors) === "{}") ? null : errors
  }

  static getNameLikeArray(name: string): Array<string> {
    if (name.includes('-')) {
      return name.split('-');
    } else if (name.trim().includes(' ')) {
      return name.trim().split(' ')
    } else {
      return  name.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase().split(' ')
    }
  }
}


