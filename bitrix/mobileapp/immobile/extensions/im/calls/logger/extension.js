(function()
{
	class CallLogger
	{
		constructor(serviceUrl, token)
		{
			this.serviceUrl = serviceUrl;
			this.token = token;

			this.socket = null;
			this.attempt = 0;
			this.reconnectTimeout = null;
			this.unsentMessages = [];

			this.onSocketOpenHandler = this.onSocketOpen.bind(this);
			this.onSocketCloseHandler = this.onSocketClose.bind(this);
			this.onSocketErrorHandler = this.onSocketError.bind(this);

			Object.defineProperty(this, "isConnected", {
				get: function() {
					return this.socket && this.socket.readyState === 1;
				}
			});

			this.connect();
		}


		log(message)
		{
			if((typeof message) != 'string')
			{
				console.error("Message should be string");
				return;
			}

			if(this.isConnected)
			{
				this.socket.send(JSON.stringify({
					action: 'log',
					message: message
				}));
			}
			else
			{
				this.unsentMessages.push(message);
			}
		}

		connect()
		{
			if(this.socket)
			{
				return;
			}
			if(!this.serviceUrl)
			{
				console.error('Logging service url is empty');
				return;
			}
			if(!this.serviceUrl.startsWith('ws://') && !this.serviceUrl.startsWith('wss://'))
			{
				console.error('Logging service url should start with ws:// or wss://');
				return;
			}
			if(!this.token)
			{
				console.error('Logging token is empty');
				return;
			}

			this.attempt++;
			this.socket = new WebSocket(this.serviceUrl + '?token=' +this.token);

			this.bindSocketEvents();
		}

		scheduleReconnect()
		{
			clearTimeout(this.reconnectTimeout);

			if(this.attempt > 3)
			{
				console.error("Could not connect to the logging service, giving up");
				return;
			}

			this.reconnectTimeout = setTimeout(this.connect.bind(this), this.getConnectionDelay(this.attempt) * 1000);
		}

		getConnectionDelay(attempt)
		{
			switch (attempt)
			{
				case 0:
				case 1:
					return 15;
				case 2:
					return 30;
				default:
					return 60;
			}
		}

		disconnect()
		{
			clearTimeout(this.reconnectTimeout);
			if(this.socket)
			{
				this.removeSocketEvents();
				this.socket.close(1000);
				this.socket = null;
			}
		}

		bindSocketEvents()
		{
			this.socket.addEventListener('open', this.onSocketOpenHandler);
			this.socket.addEventListener('close', this.onSocketCloseHandler);
			this.socket.addEventListener('error', this.onSocketErrorHandler);
		}

		removeSocketEvents()
		{
			this.socket.removeEventListener('open', this.onSocketOpenHandler);
			this.socket.removeEventListener('close', this.onSocketCloseHandler);
			this.socket.removeEventListener('error', this.onSocketErrorHandler);
		}

		onSocketOpen()
		{
			this.attempt = 0;
			for (var i = 0; i < this.unsentMessages.length; i++)
			{
				this.socket.send(JSON.stringify({
					action: 'log',
					message: this.unsentMessages[i]
				}));
			}
			this.unsentMessages = [];
		}

		onSocketClose()
		{
			this.socket = null;
			this.scheduleReconnect();
		}

		onSocketError(e)
		{
			console.error("socket error", e);
			this.socket = null;
			this.scheduleReconnect();
		}

		destroy()
		{
			this.disconnect();
			this.unsentMessages = null;
		}
	}

	window.CallLogger = CallLogger;
})();