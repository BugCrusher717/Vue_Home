<template>
    <div id=sign-up-modal>
        <div class="sign-input-group">
            <div id='title'>Sign Up</div>
            <div class="input-group mb-3">
                <div class="input-group-prepend prepend-panel">
                    <span class="input-group-text prepend-input">name: </span>
                </div>
                <input type="text" class="form-control input-text" placeholder="Phoon" v-model="userName">
                <!-- <input type="text" class="form-control input-text" placeholder="Phoon" v-model="editedTitle"> -->
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend prepend-panel">
                    <span class="input-group-text prepend-input">email: </span>
                </div>
                <input type="text" class="form-control input-text" placeholder="abc@123.def.com" v-model="userEmail"
                    @input="emailChange">
                <!-- <input type="text" class="form-control input-text" placeholder="abc@123.def.com" v-model="editedTitle"> -->
            </div>
            <div class="input-group mb-3">
                <div class="input-group-prepend prepend-panel">
                    <span class="input-group-text prepend prepend-input">password:</span>
                </div>
                <input type="password" class="form-control input-text" placeholder="input password"
                    v-model="userPassword">
                <!-- <input type="text" class="form-control input-text" placeholder="input password"
                    v-model="editedDescription"> -->
            </div>
            <div v-if="isWrong" class="wrong-panel">{{ wrongMsg }}</div>
            <div class='sign-btn'>
                <button class="sign-button sign-email" @click="signUpUser">
                    Continue with Email
                </button>
            </div>
        </div>
    </div>
</template>
<!-- This is script -->
<script>

import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';


export default {
    name: "SignUp",
    setup() {
        const router = useRouter();
        const root = ref("http://localhost:3000")
        const userName = ref("")
        const userEmail = ref("")
        const userPassword = ref("")
        const isWrong = ref(false);
        const wrongMsg = ref("");

        const signUpUser = () => {
            if (isWrong.value == false && userEmail.value != null && userPassword.value != null) {
                axios.post(root.value + "/users/signUp", { name: userName.value, email: userEmail.value, password: userPassword.value })
                    .then(res => {
                        console.log(res.data)
                        router.push({ name: "weatherlist", params: { useremail: userEmail.value, signed: 1 } });
                    // eslint-disable-next-line no-unused-vars
                    }).catch((data, err) => {
                        // console.log(data.response.data.message);
                        isWrong.value = true;
                        wrongMsg.value = data.response.data.message
                        // console.log(err.message);
                    })
            }
        }
        const isValidEmail = (value) => {            
            const isValid = value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value) ? false : true;
            isWrong.value = !isValid;
            console.log(isValid)
            if (isWrong.value == true) {
                wrongMsg.value = "Please Input Valid Email Information"
            }
        }

        const emailChange = (e) => {
            isValidEmail(e.target.value)
        }
        return {
            root,
            userName,
            userEmail,
            userPassword,
            wrongMsg,
            isWrong,
            signUpUser,
            isValidEmail,
            emailChange,
        }
    }
}
</script>

<style>
#sign-up-modal {
    align-items: center;
    width: 80%;
    background: #2c2a134f;
    border-radius: 1.5em;
    /* height: 80%; */
    margin-top: 3.75em;
    justify-content: center;
    align-items: center;
}

#title {
    color: white;
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

.wrong-panel {
    color: yellow;
    text-align: left;
    font-size: 15px;
}

.prepend-input {
    width: 100%;
}

.input-text {
    width: 50%;
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
