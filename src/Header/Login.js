import React, { Component } from 'react';

class Login extends Component {
    render () {
        return (
            <div className="login">
                {/* The action of the form is unset for now */}
                <form>
                    <table>
                        <tr>
                            <td><label>Username: </label></td>
                            <td><input type="text" name="userName"/></td>
                        </tr>
                        <tr>
                            <td><label>Password: </label></td>
                            <td><input type="text" name="password"/></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td><input type="submit"/></td>
                        </tr>
                    </table>
                </form>
            </div>
        )
    }
}

export default Login;