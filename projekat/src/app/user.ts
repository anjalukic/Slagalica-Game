
export class User {
    name: string;
    lastname: string;
    email: string;
    profession: string;
    username: string;
    password: string;
    gender: string;
    jmbg: string;
    question: string;
    answer: string;
    type: string;
 constructor(name: string, lastname: string, email: string, profession: string,
             username: string,  password: string, gender: string, jmbg: string, question: string,  answer: string) {
    this.name = name;
    this. lastname = lastname;
    this.email = email;
    this. profession = profession;
    this.username = username;
    this.password = password;
    this.gender = gender;
    this.jmbg = jmbg;
    this.question = question;
    this.answer = answer;
    this.type = 'player';
  }
}
