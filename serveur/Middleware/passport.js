const passport = require("passport");
const User = require("../Models/User");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SecretOrKey,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      console.log("📢 Token reçu dans passport:", jwt_payload); // 🔍 Ajout de logs

      const user = await User.findOne({ _id: jwt_payload._id }).select(
        "-password"
      );

      if (user) {
        console.log("✅ Utilisateur authentifié:", user);
        return done(null, user);
      } else {
        console.log("❌ Utilisateur non trouvé");
        return done(null, false);
      }
    } catch (error) {
      console.error("❌ Erreur dans Passport:", error);
      return done(error, false);
    }
  })
);

module.exports = isAuth = () =>
  passport.authenticate("jwt", { session: false });
