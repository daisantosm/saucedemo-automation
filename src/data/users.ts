export type User = {
  username: string;
  password: string;
};

const PASSWORD = "secret_sauce";

export const USERS = {
  standard: { username: "standard_user", password: PASSWORD },
  performanceGlitch: {
    username: "performance_glitch_user",
    password: PASSWORD,
  },
  lockedOut: { username: "locked_out_user", password: PASSWORD },
  problem: { username: "problem_user", password: PASSWORD },
} as const satisfies Record<string, User>;
