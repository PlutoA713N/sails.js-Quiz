module.exports = {
    index: async function(req, res) {
      if (req.oidc.isAuthenticated()) {
        return res.send('Logged in');
      } else {
        return res.send('Logged out');
      }
    }
  };
  