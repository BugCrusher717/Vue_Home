<template>
    <div id=sign-in-modal class="sign-input-group">
        <div id='title'>Sign In</div>
        <div class="input-group mb-3">
            <div class="input-group-prepend prepend-panel">
                <span class="input-group-text prepend-input">email: </span>
            </div>
            <input type="text" class="form-control input-text " placeholder="abc@123.def.com" v-model="userEmail"
                @input="emailChange">
            <!-- <input type="text" class="form-control input-text" placeholder="abc@123.def.com" v-model="editedTitle"> -->
        </div>
        <div class="input-group mb-3">
            <div class="input-group-prepend prepend-panel">
                <span class="input-group-text prepend prepend-input">password:</span>
            </div>
            <input type="password" class="form-control input-text" placeholder="input password" v-model="userPassword">
            <!-- <input type="text" class="form-control input-text" placeholder="input password"
                    v-model="editedDescription"> -->
        </div>
        <div v-if="isWrong" class="wrong-panel">{{ wrongMessage }}</div>
        <div class='sign-btn'>
            <button class="sign-button sign-email" @click="signInUser">
                Continue with Email
            </button>
            <button class="sign-button sign-google" @click="googleLogin">
                Continue with Google
            </button>
        </div>
    </div>
</template>

<script>

import axios from 'axios';
import { useRouter } from 'vue-router';
import { ref, watchEffect } from 'vue';
import { useAuth0 } from '@auth0/auth0-vue'


export default {
    name: "SignIn",
    setup() {

        const router = useRouter();
        const userEmail = ref("");
        const userPassword = ref("");
        const root = ref("http://localhost:3000");

        const isWrong = ref(false);
        const wrongMessage = ref("");

        const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();
        watchEffect(() => {
            if (isAuthenticated) {
                console.log(user.value.email)
                const googleEmail = user.value.email
                router.push({ name: "weatherlist", params: { useremail: googleEmail, signed: 2 } });
            }
        });
        const signInUser = () => {
            // console.log(root.value + "/users/signIn")
            isValidEmail(userEmail.value)
            if (isWrong.value == false && userEmail.value != null && userPassword.value != null)
                axios.post(root.value + "/users/signIn", { email: userEmail.value, password: userPassword.value })
                    .then(res => {
                        console.log(res.data)
                        router.push({ name: "weatherlist", params: { useremail: userEmail.value, signed: 1 } });
                    }).catch(err => {
                        isWrong.value = true;
                        wrongMessage.value = "Please Input Correct Information"
                        console.log(err.message);
                    })
        }

        const isValidEmail = (value) => {
            const isValid = value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value) ? false : true;
            isWrong.value = !isValid;
            if (isWrong.value == true) {
                wrongMessage.value = "Pleaes Input Valid Email Information"
            }
        }
        const googleLogin = () => {
            loginWithRedirect();
        }
        const emailChange = (e) => {
            isValidEmail(e.target.value)
            console.log(e.target.value)
        }
        return {
            userEmail,
            userPassword,
            root,
            isWrong,
            wrongMessage,
            user,
            isAuthenticated,
            signInUser,
            isValidEmail,
            emailChange,
            googleLogin,
            logout
        }
    }
}
</script>

<style>
#sign-in-modal {
    justify-content: center;
    align-items: center;
    width: 80%;
    background: #2c2a134f;
    border-radius: 1.5em;
    /* height: 80%; */
    margin-top: 3.75em;
}

#title {
    text-align: center;
    font-weight: bolder;
    font-size: 2em;
    letter-spacing: 0.2em;
    margin-bottom: 0.5em;
}

.sign-input-group {
    padding: 1.5em 2em;
    margin: auto;
    justify-content: center;
    align-items: center;
}

.sign-button {
    align-items: center;
    align-content: center;
    margin-top: 1em;
    border-radius: 1.4em;
    border: none;
    height: 2em;
    width: 100%;
}

.sign-email {
    background-color: #14a800;
    color: white;
}

.sign-btn {
    margin: auto;
}

.sign-google {
    background-color: #4285f4;
    color: white;
}

.prepend-panel {
    width: 30%;
}

.prepend-input {
    width: 100%;
}

.input-text {
    width: 50%;
}

.wrong-panel {
    color: yellow;
    text-align: left;
    font-size: 15px;
}


#individualTask {
    margin: 1em;
    border: 0.05em solid #2c3e50;
    border-radius: 0.5em;
}

#header {
    font-weight: bolder;
    border-bottom: 0.05em solid #2c3e50;
    padding-left: 0.5em;
    padding-right: 0.5em;
}

#taskDate {
    text-align: right;
}

#taskDescription {
    padding-top: 0.25em;
    padding-bottom: 0.25em;
    padding-left: 0.5em;
    padding-right: 0.5em;
}

#edit {
    text-align: right;
}

#completed {
    margin: 0.5em;
    vertical-align: 0.075em;
}
</style>
<style scoped>
</style>
