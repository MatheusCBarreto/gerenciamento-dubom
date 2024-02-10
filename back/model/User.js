let user = require('../database/connection');
let mongoose = require('mongoose');
let bcrypt = require('bcrypt');

let Userdb = mongoose.model('UserDubom', user);

class User {
  async createUser(name, email, password) {
    try {
      let hash = await bcrypt.hash(password, 15);

      const newUser = new Userdb({
        name,
        email,
        password: hash,
      });

      newUser.save();
    } catch (err) {
      console.log(err);
    }
  }
  async findEmail(email) {
    try {
      let result = await Userdb.findOne({ email: email });
      if (result != undefined) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async allUsers() {
    try {
      let users = await Userdb.find();
      if (users == undefined) {
        return users;
      } else {
        let msg = 'Não há usuários cadastrados';
        return msg;
      }
    } catch (err) {}
  }

  async dataUser(email) {
    try {
      let result = await Userdb.find({ email: email });

      if (result != undefined) {
        return result;
      } else {
        console.log('Usuário não existe');
      }
    } catch (err) {
      console.log('Erro interno!');
    }
  }

  async update(name, email, role) {
    let userNewData = {};

    try {
      let result = await Userdb.find({ email: email });
      if (result != undefined) {
        if (email != Userdb.email) {
          userNewData = email;
        }
      } else {
        console.log('Erro interno!');
      }

      if (name != undefined || name != Userdb.name) {
        userNewData = name;
      } else {
        console.log('Erro interno!');
      }

      if (role != undefined || role != Userdb.role) {
        userNewData = role;
      } else {
        console.log('Erro interno!');
      }
      await Userdb.update(userNewData);
    } catch (err) {
      console.log(err);
    }
  }

  async userDelete(email) {
    try {
      let user = await Userdb.findOne({ email: email });

      if (user == undefined) {
        console.log('Usuário não encontrado, logo não pode ser deletado!');
        return;
      }

      await Userdb.deleteOne(user);
    } catch (err) {
      console.log('Erro interno!');
    }
  }
}

module.exports = User;
