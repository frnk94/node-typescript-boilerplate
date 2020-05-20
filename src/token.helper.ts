interface Request {
  [key: string]: any;
}

export const getTokenFromSession = (
  req: Request,
  sandbox?: boolean,
): string => {
  if (!req.session) throw new Error('Express session not initialize');
  return sandbox ? 'sandbox_token' : 'token';
};

export const getStreamingToken = (req: Request): string => {
  return process.env.ENV_PROFILE === 'prd'
    ? getTokenFromSession(req)
    : getTokenFromSession(req, true);
};
