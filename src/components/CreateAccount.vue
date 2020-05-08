<template>
    <section class="main-container col1-layout">
        <div class="main container">
            <div class="account-login">
                <div class="col-md-4 hidden-xs"></div>
                <div class="col-lg-6 col-sm-8 col-md-7 col-xs-12">
                    <div class="page-title">
                        <h2>Create an Account</h2>
                    </div>
                    <fieldset class="col2-set">
                        <div class="col registered-users">
                            <div class="content">
                                <p>Please fill in this form to create an account.</p>
                                <ul class="form-list">
                                    <li>
                                        <label for="First Name">First Name <span class="required">*</span></label>
                                        <br>
                                        <input type="text" title="First Name" class="input-text required-entry"
                                               id="email" value="" name="login[First Name]">
                                    </li>
                                    <li>
                                        <label for="Last Name">Last Name <span class="required">*</span></label>
                                        <br>
                                        <input type="text" title="Last Name" class="input-text required-entry"
                                               id="email" value="" name="login[Last Name]">
                                    </li>
                                    <li>
                                        <label for="Mobile Number">Mobile Number <span class="required">*</span></label>
                                        <br>
                                        <input type="text" title="Mobile Number" class="input-text required-entry"
                                               id="email" value="" name="login[Mobile Number]">
                                    </li>
                                    <li>
                                        <label for="Your Email">Your Email <span class="required">*</span></label>
                                        <br>
                                        <input type="text" title="Email Address" class="input-text required-entry"
                                               id="email" value="" name="login[Your Email]">
                                    </li>
                                    <li>
                                        <label for="New Password">New Password <span class="required">*</span></label>
                                        <br>
                                        <input type="password" title="Password" id="pass"
                                               class="input-text required-entry validate-password"
                                               name="login[password]">
                                    </li>
                                </ul>
                                <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms &
                                    Privacy</a>.</p>
                                <div class="buttons-set">
                                    <button id="send2" name="send" type="submit" class="button login">
                                        <span>Sign Up</span></button>
                                    <button class="button">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: "CreateAccount"
    }
</script>
