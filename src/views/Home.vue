<template>
	<div>
		<v-card class="mx-auto my-6" max-width="70%">
			<v-row class="py-4 pl-4 pr-4">
				<v-col class="shrink">
					<v-img height="200" width="200" src="https://cdn.vuetifyjs.com/images/cards/store.jpg"></v-img>
					<div class="my-4 mx-auto">
						<p class="text-justify caption mx-auto text-center">
							<span>留言板</span>
							<span>{{newDate}}</span>
						</p>
					</div>
					<!-- <button @click="test">aaa</button> -->
					<!-- {{testMes}} -->
				</v-col>
				<v-divider class="mx-4" inset vertical></v-divider>
				<v-col>
					<v-card elevation="0">
						<v-card-actions>
							<span>当前登录状态:{{toStringIsLogin}}</span>
							<div class="flex-grow-1"></div>
							<span>登录用户:{{LoginUserName}}</span>
							<div class="flex-grow-1"></div>
							<v-btn color="success" text @click.stop="dialog=!dialog" :disabled="messageDisabled">我要留言</v-btn>
						</v-card-actions>
					</v-card>
					<v-card v-for="(item, index) in messageBoard" :key="index" class="my-4">
						<v-card-title primary-title class="caption">
							<v-avatar color="indigo" size="36" class="mr-2">
								<span class="white--text headline">{{item.userName.charAt(0)}}</span>
							</v-avatar>
							<span>{{item.userName.charAt(1)}}</span>
							<div class="flex-grow-1"></div>
							<span>{{item.date}}</span>
							<div class="flex-grow-1"></div>
							<v-btn
								color="error"
								text
								fab
								small
								:disabled="loginUser!='admin'"
								@click="deleteMessage(index)"
							>删除</v-btn>
						</v-card-title>
						<v-divider></v-divider>
						<v-card-text class="title">{{item.message}}</v-card-text>
					</v-card>
				</v-col>
			</v-row>

			<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
				<!-- <template v-slot:activator="{ on }">
					<v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
				</template>-->
				<v-card>
					<v-toolbar dark color="primary">
						<v-btn icon dark @click="dialog = false">
							<v-icon>mdi-close</v-icon>
						</v-btn>
						<v-toolbar-title>留言</v-toolbar-title>
						<div class="flex-grow-1"></div>
						<v-toolbar-items>
							<v-btn dark text @click="uploadMessage" :disabled="!inputMessage">提交</v-btn>
						</v-toolbar-items>
					</v-toolbar>
					<v-card-text>
						<v-container fluid>
							<v-textarea name="input-7-1" filled auto-grow v-model="inputMessage"></v-textarea>
						</v-container>
					</v-card-text>
				</v-card>
			</v-dialog>
		</v-card>
	</div>
</template>

<script>
// import messageBoard from '../data/messageBoard.js';
import users from '../data/users.js';
export default {
	mixins: [users],
	data() {
		return {
			messageBoard: null,
			inputMessage: '',
			dialog: false,
			newDate: new Date().getFullYear()
		};
	},
	methods: {
		/**
		 * 处理时间格式
		 */
		disposeDate() {
			let year, month, monthDay, hours, minutes;
			let date = new Date();
			year = date.getFullYear();
			month = date.getMonth() + 1;
			monthDay = date.getDate();
			hours = date.getHours();
			if (hours < 10) hours = '0' + hours;
			minutes = date.getMinutes();
			if (minutes < 10) minutes = '0' + minutes;
			return year + '/' + month + '/' + monthDay + ' ' + hours + ':' + minutes;
		},
		/**
		 *初始化时 获取后台留言数据 有created钩子函数调用
		 */
		getMessageBoard() {
			this.axios.post('api/messageBoardSel').then(res => {
				this.messageBoard = res.data.messageBoard;
				console.log(this.testMes);
			});
		},
		/**
		 * 删除留言
		 */
		deleteMessage(index) {
			this.axios
				.post('api/messageBoardSel', {
					index
				})
				.then(res => {
					this.messageBoard = res.data.messageBoard;
					console.log('this.messageBoard==>', this.messageBoard);
				});
		},
		/**
		 * 提交留言，将数据添加到 messageBoard中
		 */
		uploadMessage() {
			let message = {
				userName: this.LoginUserName,
				date: this.disposeDate(),
				message: this.inputMessage
			};
			this.axios.post('api/messageBoardAdd', message).then(res => {
				this.messageBoard = res.data.messageBoard;
				console.log('this.messageBoard==>', this.messageBoard);
				this.inputMessage = '';
				this.dialog = false;
			});
		}
	},
	components: {},
	computed: {
		LoginUserName() {
			return this.$store.state.loginUserName;
		},
		messageDisabled() {
			if (this.isLogin) {
				if (this.LoginUserName === '留言板大大') return true;
				return false;
			}
			return true;
		},
		toStringIsLogin() {
			return this.isLogin ? '已登录' : '未登录';
		},
		isLogin() {
			return this.$store.state.isLogin;
		},
		loginUser() {
			return this.$store.state.loginUser;
		}
	},
	created() {
		this.getMessageBoard();
	}
};
</script>
