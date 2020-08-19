<template>
	<v-app>
		<v-app-bar app color="primary" class="white--text">
			<v-app-bar-nav-icon class="white--text" @click="drawer=!drawer"></v-app-bar-nav-icon>
			<v-toolbar-title class="headline text-uppercase">
				<span>my</span>
				<span class="font-weight-light">project demo</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items>
				<v-btn class="white--text" text to="/" @click="$store.commit('handleLoginUser',null)">登录</v-btn>
			</v-toolbar-items>
		</v-app-bar>

		<v-navigation-drawer v-model="drawer" absolute temporary>
			<v-toolbar color="primary">
				<v-toolbar-title class="text-uppercase white--text">
					<span class="font-weight-light">menu list</span>
				</v-toolbar-title>
			</v-toolbar>
			<v-list nav dense>
				<v-list-item
					link
					v-for="(item, index) in menusItem"
					:key="index"
					:to="item.path"
					:disabled="!isLogin"
				>
					<v-list-item-title>{{item.name}}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-content>
			<router-view></router-view>
		</v-content>
		<v-divider></v-divider>
		<v-footer>
			<div class="flex-grow-1"></div>
			<div>&copy; {{ new Date().getFullYear() }}</div>
		</v-footer>
	</v-app>
</template>

<script>
import menus from './data/menus.js';
export default {
	mixins: [menus],
	name: 'App',
	components: {},
	data: () => ({
		drawer: false
	}),
	computed: {
		isLogin() {
			return this.$store.state.isLogin;
		}
	}
};
</script>
