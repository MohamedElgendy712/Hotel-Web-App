export class User{

    firstName = '';
    lastName = '';
    email= '';
    phone= '';
    birthDate= '';
    password= '';

    constructor(firstName , lastName , email, phoneNumber , birthDate , password){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phoneNumber;
        this.birthDate = birthDate;
        this.password = password;
    }
}