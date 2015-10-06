(function(Prism) {
	var varsRegex = /\$(?:[a-z0-9_#\?\-\*!@]+|\{[^}]+\})/i,
	    bashVars = { variable: varsRegex };

	Prism.languages.bash = {
		'shebang': {
			pattern: /^#!\s*\/bin\/bash|^#!\s*\/bin\/sh/,
			alias: 'important'
		},
		'comment': {
			pattern: /(^|[^"{\\])#.*/,
			lookbehind: true
		},
		'string': [
			{
				pattern: /"(?:\\?[\s\S])*?"/g,
				inside: bashVars
			},
			// Single quote strings cannot have variables inside
			/'(?:\\?[\s\S])*?'/g,
			// Support for Here-Documents https://en.wikipedia.org/wiki/Here_document
			{
				pattern: /(<<\s*)(\w+?)\s*\r?\n(?:[\s\S])*?\r?\n\2/g,
				lookbehind: true,
				inside: bashVars
			}
		],
		// Redefined to prevent highlighting of numbers in filenames
		'number': {
			pattern: /([^\w\.])-?(0x[\dA-Fa-f]+|\d*\.?\d+([Ee]-?\d+)?)\b/,
			lookbehind: true
		},
		'variable': varsRegex,
		// Originally based on http://ss64.com/bash/
		'function': /\b(?:alias|apropos|apt-get|aptitude|aspell|awk|basename|bash|bc|bg|builtin|bzip2|cal|cat|cd|cfdisk|chgrp|chmod|chown|chroot|chkconfig|cksum|clear|cmp|comm|command|cp|cron|crontab|csplit|cut|date|dc|dd|ddrescue|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|enable|env|ethtool|eval|exec|expand|expect|export|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|getopts|git|grep|groupadd|groupdel|groupmod|groups|gzip|hash|head|help|hg|history|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|jobs|join|kill|killall|less|link|ln|locate|logname|logout|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|make|man|mkdir|mkfifo|mkisofs|mknod|more|most|mount|mtools|mtr|mv|mmv|nano|netstat|nice|nl|nohup|notify-send|nslookup|open|op|passwd|paste|pathchk|ping|pkill|popd|pr|printcap|printenv|printf|ps|pushd|pv|pwd|quota|quotacheck|quotactl|ram|rar|rcp|read|readarray|readonly|reboot|rename|renice|remsync|rev|rm|rmdir|rsync|screen|scp|sdiff|sed|seq|service|sftp|shift|shopt|shutdown|sleep|slocate|sort|source|split|ssh|stat|strace|su|sudo|sum|suspend|sync|tail|tar|tee|test|time|timeout|times|touch|top|traceroute|trap|tr|tsort|tty|type|ulimit|umask|umount|unalias|uname|unexpand|uniq|units|unrar|unshar|uptime|useradd|userdel|usermod|users|uuencode|uudecode|v|vdir|vi|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yes|zip)\b/,
		'keyword': /\b(let|if|then|else|elif|fi|for|break|continue|while|in|case|function|select|do|done|until|echo|exit|return|set|declare)\b/,
		'boolean': /\b(?:true|false)\b/,
		'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
		'punctuation': /[{}[\];(),.:]/
	};
})(Prism);