import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const providers = [
  Providers.GitHub({
    clientId: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
  }),
  Providers.Google({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }),
  Providers.Facebook({
    clientId: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
  }),
];

const callbacks = {} as any;

callbacks.signIn = async function signIn(user, account, metadata) {
  if (account.provider === "github") {
    const githubUser = {
      id: metadata.id,
      login: metadata.login,
      name: metadata.name,
      avatar: user.image,
    };

    // user.accessToken = await getTokenFromYourAPIServer("github", githubUser);
    return true;
  }

  return false;
};

callbacks.jwt = async function jwt(token, user) {
  if (user) {
    token = { accessToken: user.accessToken };
  }

  return token;
};

callbacks.session = async function session(session, token) {
  session.accessToken = token.accessToken;
  return session;
};

const options = {
  providers,
  callbacks,
};

export default (req, res) => NextAuth(req, res, options);
