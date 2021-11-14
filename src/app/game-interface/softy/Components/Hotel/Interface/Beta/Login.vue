<template>
  <div class="login">
    <div class="logo"></div>
    <white-box class="form-container">
      <span slot="title">Connexion à HOLO5</span>
      <form slot="body" class="content" @submit.prevent="login">
        <p class="error" v-if="error">{{ error }}</p>
        <div class="input-group">
          <label for="username">Pseudo <span>*</span></label>
          <input type="text" name="username" id="username" v-model="username" placeholder="Écrire ici...">
        </div>
        <div class="input-group">
          <label for="password">Mot de passe <span>*</span></label>
          <input type="password" name="password" id="password" v-model="password" placeholder="*******">
        </div>
        <div class="input-group">
          <label for="pin">Code PIN</label>
          <input type="text" name="pin" id="pin" v-model="pin" placeholder="ex. 1234">
        </div>
        <div class="input-group double">
          <text-button class="btn" :icon="'question'" :text="'Mot de passe oublié'" :color="'#c53131'" @click.native="goPasswordLost"></text-button>
          <text-button class="btn" :icon="'chev-right'" :text="'Me connecter'" :color="'#52bc48'" @click.native="login"></text-button>
        </div>
      </form>
    </white-box>
    <a href="https://www.habbocity.me/register" target="_blank" class="external-link city">
      <h1>S'inscrire sur HabboCity</h1>
      <span>Un compte sur HabboCity est nécessaire pour accéder à la bêta de HOLO5.</span>
    </a>
    <a href="https://discord.gg/VQ5cV55e" target="_blank" class="external-link discord">
      <h1>Rejoins Holo5 sur Discord</h1>
      <span>Et viens discuter avec nous !</span>
    </a>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import WhiteBox from '../Elements/Box/WhiteBox.vue';
import TextButton from '../Elements/Buttons/Fat/TextButton.vue';

export default Vue.extend({
  name: 'holo-beta-login',
  components: {
    TextButton,
    WhiteBox
  },
  data: () => ({
    username: '',
    password: '',
    pin: '',
    error: false
  }),
  methods: {
    goPasswordLost() {
      window.open('https://habbocity.me/index'); // TODO: lien mdp perdu city
    },
    setError(msg: string) {
      this.error = msg;
    },
    login() {
      if (this.username === '' || this.password == '') {
        return this.setError('Merci de remplir les champs vides !');
      }

      this.$store.dispatch('beta/login', {login: this.username, password: this.password, pin: this.pin});
    },
  },
});
</script>

<style lang="scss" scoped>
@import "../../../../assets/sass/variables";
@import "../../../../assets/sass/colors";
@import "../../../../assets/sass/mixins";

.login {
  background-color: #372a3d;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .logo {
    height: 200px;
    width: 400px;
    background-image: url('~/app/game-interface/softy/assets/images/holo-logo.png');
    background-position: top center;
    background-repeat: no-repeat;
    margin-top: -100px;
    transition: 150ms ease-in-out all;
  }

  .form-container {
    width: 400px;

    .content {
      padding: 0 15px 15px 15px;

      .error {
        background-color: $red;
        padding: 12px 14px;
        color: $white;
        font-size: 14px;
        border-radius: $medium-border-radius;
      }

      .input-group {
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        z-index: auto;
        width: 100%;

        &:first-child {
          margin-top: 0;
        }

        &.double {
          flex-direction: row;
          margin-left: -15px;
          width: calc(100% + 15px);

          .btn {
            margin-left: 15px;

            &:first-child {
              width: 130%;
            }
          }
        }

        label {
          font-size: 13px;
          color: #666666;
          text-transform: uppercase;
          font-weight: bold;
          margin-bottom: 7px;

          span {
            color: $red;
          }
        }

        input {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
          background-color: #fff;
          border-radius: $medium-border-radius;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.15);
          padding: 0 15px;
          height: 40px;
          font-size: 13px;
          color: #666666;
        }
      }
    }
  }

  .external-link {
    width: 400px;
    border-radius: $big-border-radius - 2;
    margin-top: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    transition: 150ms ease-in-out opacity;
    opacity: 1;
    padding: 15px 15px 6px 15px;

    h1 {
      color: $white;
      font-size: 20px;
      padding-top: 5px;
      padding-bottom: 2px;
    }

    span {
      color: $white;
      font-size: 14px;
    }

    &:hover {
      opacity: 0.8;
    }

    &.discord {
      background: linear-gradient(92.18deg, rgba(161, 16, 213, 0.9) 19.17%, rgba(253, 197, 38, 0.9) 97.79%);

      &::before {
        content: '';
        width: 51px;
        height: 58px;
        margin-right: 15px;
        background-image: url('~/app/game-interface/softy/assets/images/discord-icon.png');
        float: left;
      }
    }

    &.city {
      background: linear-gradient(92.18deg, rgba(81, 47, 178, 0.9) 19.17%, rgba(132, 110, 198, 0.9) 97.79%);
      padding: 15px 15px 15px 15px;

      &::before {
        content: '';
        width: 51px;
        height: 51px;
        margin-right: 15px;
        background-image: url('~/app/game-interface/softy/assets/images/city.png');
        float: left;
        margin-top: 4px;
      }

      h1 {
        padding-top: 0;
      }
    }
  }
}
</style>
