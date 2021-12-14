export const authMixin = {
  methods: {
    login() {
      this.$store.state.isLogged = true
      this.$router.push('/');
    },
    logout() {
      this.$store.state.isLogged = false
      this.$router.push('/');
    },
  },
}