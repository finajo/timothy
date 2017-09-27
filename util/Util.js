class Util {
	constructor() {
		throw new Error(`The ${this.constructor.name} class may not be instantiated.`);
	}

	static cleanContent(msg, content) {
		return content.replace(/@everyone/g, '@\u200Beveryone')
			.replace(/@here/g, '@\u200Bhere')
			.replace(/<@&[0-9]+>/g, roles => {
				const replaceID = roles.replace(/<|&|>|@/g, '');
				const role = msg.channel.guild.roles.get(replaceID);

				return `@${role.name}`;
			})
			.replace(/<@!?[0-9]+>/g, user => {
				const replaceID = user.replace(/<|!|>|@/g, '');
				const member = msg.channel.guild.members.get(replaceID);

				return `@${member.user.username}`;
			});
	}

	static isJarpyNickname(nickname) {
		if (!nickname) {
			return false;
		}

		const hearts = '💕';
		// +1 accounts for the space on either side of the nickname.
		const heartsLength = hearts.length + 1;

		const startOfNick = nickname.substr(0, heartsLength);
		const endOfNick = nickname.substr(nickname.length - heartsLength);

		return (startOfNick === `${hearts} ` && endOfNick === ` ${hearts}`);
	}

	static isNumber(number) {
		return (!isNaN(number) && isFinite(number));
	}

	static isSplatRole(role) {
		const splatPrefix = 'Splat ';
		return role.name.substr(0, splatPrefix.length) === splatPrefix;
	}

	static isString(str) {
		return typeof str === 'string' || str instanceof String;
	}

	static isUrl(item) {
		return (item.search(/https?:\/\/[^ \/\.]+\.[^ \/\.]+/) !== -1); // eslint-disable-line no-useless-escape
	}
}

module.exports = Util;
