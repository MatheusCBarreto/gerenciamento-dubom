class HomeController {
  async index(req, res) {
    res.send('Sistema Dubom!');
  }
}

module.exports = new HomeController();
