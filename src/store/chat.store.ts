import store from './store';

const chatUsers = store([]);
const chatStore = store([]);
const activeChatUser = store({});

export { chatStore, activeChatUser, chatUsers };
