<template>
    <section class="main-container col1-layout">
        <PleaseWait :isLoading="isLoading"/>
        <div class="main container">
            <div class="account-login">
                <div class="page-title">
                    <h2>Create an account or Login</h2>
                </div>
                <fieldset class="col2-set">
                    <div class="col-1 new-users"><strong>New to our site ?</strong>
                        <div class="content">
                            <div class="buttons-set">
                                <button onclick="window.location='/#/create-account';" class="button create-account"
                                        type="button"><span>Create an Account</span></button>
                            </div>
                        </div>
                    </div>

                    <div class="col-2 registered-users"><strong>Already have account ?</strong>
                        <div class="content">
                            <p>Please log in.</p>
                            <ul class="form-list">
                                <li>
                                    <label for="email">Email Address <span class="required">*</span></label>
                                    <br>
                                    <input type="text" title="Email Address" class="input-text required-entry"
                                           id="email" v-model="emailAddress" required>
                                </li>
                                <li>
                                    <label for="password">Password <span class="required">*</span></label>
                                    <br>
                                    <input type="password" id="password"
                                           class="input-text required-entry validate-password" v-model="password"
                                           required>
                                </li>
                            </ul>
                            <p class="required">* Required Fields</p>
                            <div class="buttons-set">
                                <button class="button login" v-on:click="login">
                                    <span>Login</span>
                                </button>&nbsp;
                                <a class="forgot-word" href="/#/forgot-password">Forgot Your Password?</a></div>
                        </div>
                    </div>
                </fieldset>
            </div>
        </div>
    </section>
</template>

<script>
    import axios from "axios";
    import Settings from "@/common/settings";
    import SessionStore from "@/common/session_store";
    import PleaseWait from "@/components/PleaseWait";
    import {EventBus} from "@/common/event-bus";

    export default {
        name: "Login",
        components: {PleaseWait},
        data() {
            return {
                emailAddress: '',
                password: '',
                isLoading: false
            }
        },
        methods: {
            login: function () {
                this.isLoading = true;

                axios.post(`${Settings.GetUserApiUrl()}/login`, {
                    email: this.emailAddress,
                    password: this.password
                }).then(resp => {
                    let result = resp.data.data;
                    SessionStore.SetSession(this.$ls, result);
                    EventBus.$emit('nav-refresh', true);
                    this.$router.push(SessionStore.getReturnPath(this.$ls));
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                    this.errors = err.response.data.title;
                })
            },
        }
    }
</script>
