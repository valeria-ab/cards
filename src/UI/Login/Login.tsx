import React from "react";

const Login = () => {
  return (
    <div>
      <h2>It-incubator</h2>
      <h3>Sign In</h3>
      <form onSubmit={() => {}}>
        <div>
          <label>Email</label>
          <div>
            <input type="email" name="email" />
          </div>
        </div>
        <div>
          <label>Password</label>
          <div>
            <input type="password" name="password" />
          </div>
        </div>
        <div>
          <a href="">Forgot password</a>
        </div>
        <div>
          <input type="submit" value="Login" />
        </div>
      </form>
      <div>Don't have an account?</div>
      <div>
        <a href="">Sign Up</a>
      </div>
    </div>
  );
};

export default Login;
