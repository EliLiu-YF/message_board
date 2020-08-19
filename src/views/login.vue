<template>
	<div>
		<v-toolbar color="primary" dark extended flat height="300"></v-toolbar>
		<v-card class="mx-auto" max-width="50%" style="margin-top: -120px">
			<v-card-title primary-title>登录</v-card-title>
			<v-card-text>
				<v-form ref="form" v-model="valid" lazy-validation>
					<v-text-field
						label="Username"
						v-model="username"
						:rules="usernameRules"
						:counter="10"
						required
					></v-text-field>
					<v-text-field
						label="Password"
						v-model="password"
						:rules="passwordRules"
						:counter="10"
						required
					></v-text-field>
				</v-form>
			</v-card-text>
			<v-card-actions>
				<v-row justify="center">
					<v-col cols="4">
						<v-btn color="text" width="100%" @click.stop="validateClick">登录</v-btn>
					</v-col>
					<v-col cols="4">
						<v-btn color="text" width="100%">注册</v-btn>
					</v-col>
					<v-col cols="4">
						<v-btn color="teal" width="100%" @click="resetClick">重置</v-btn>
					</v-col>
				</v-row>
			</v-card-actions>
		</v-card>
		<v-dialog v-model="dialog" width="500">
			<v-card>
				<v-card-title class="headline">提示框</v-card-title>

				<v-card-text>登录成功,进入主页面</v-card-text>

				<v-card-actions>
					<div class="flex-grow-1"></div>
					<v-btn color="green darken-1" text @click="dialog = false" to="home">Agree</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
import users from '../data/users.js';
export default {
	mixins: [users],
	data: () => ({
		dialog: false,
		flag: null,
		valid: false,
		username: '001',
		usernameRules: [
			v => !!v || '用户名不能为空',
			v => (v && v.length <= 10) || '用户名长度不能超过10'
		],
		password: '001',
		passwordRules: [
			v => !!v || '必须输入密码'
			// v =>
			// 	(/^[A-z]{3,3}[0-9]{3,6}(@|\.)+$/.test(v) && v.length <= 10) ||
			// 	'密码格式错误'
		]
	}),
	methods: {
		/**
		 * 验证用户名和密码
		 * 修改store中isLogin(登录状态)，loginUser(登录的用户名)
		 */
		judgeLogin() {
			this.axios
				.post('api/verifyLoginUser', {
					id: this.username,
					password: this.password
				})
				.then(res => {
					console.log('服务器响应的数据==>', res.data);
					this.$store.commit('handleIsLogin', res.data.flag);
					if (res.data.flag) {
						this.$store.commit('handleLoginUser', res.data.id);
						this.$store.commit('handleLoginUserName', res.data.name);
					}
					this.dialog = res.data.flag;
					console.log('登录状态==>', this.$store.state.isLogin);
					console.log('登录id==>', this.$store.state.loginUser);
					console.log('登录用户名==>', this.$store.state.loginUserName);
				});
		},
		/**
		 * 登录提交触发方法，
		 *
		 */
		validateClick() {
			this.$refs.form.validate();
			this.judgeLogin();
		},
		resetClick() {
			this.$refs.form.reset();
		}
	}
};
</script>