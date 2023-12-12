import React, { useEffect, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import { BiBot, BiUser } from 'react-icons/bi';
import styles from '../styles.module.css';
import { useSelector } from 'react-redux';

const ChatEngine = (props) => {
	const [showChat, setShowChat] = useState(false);
	useEffect(() => {
		if (props.visible) {
			setTimeout(() => {
				setShowChat(true);
			}, 500);
		}
	});
	const user = useSelector((state) => state.user);
	const [chat, setChat] = useState([]);
	const [inputMessage, setInputMessage] = useState('');
	const [botTyping, setbotTyping] = useState(false);

	useEffect(() => {
		const objDiv = document.getElementById('messageArea');
		objDiv.scrollTop = objDiv.scrollHeight;
	}, [chat]);
	if (!user) return null;
	const handleSubmit = (evt) => {
		evt.preventDefault();
		const name = user.id;
		const request_temp = { sender: name, msg: inputMessage };

		if (inputMessage !== '') {
			setChat((chat) => [...chat, request_temp]);
			setbotTyping(true);
			setInputMessage('');
			rasaAPI(name, inputMessage);
		} else {
			window.alert('Please enter valid message');
		}
	};

	const rasaAPI = async function handleClick(name, msg) {
		await fetch('http://localhost:5005/webhooks/rest/webhook', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				charset: 'UTF-8',
			},
			credentials: 'same-origin',
			body: JSON.stringify({
				sender: name,
				message: msg,
			}),
		})
			.then((response) => response.json())
			.then((response) => {
				if (response) {
					const temp = response[0];
					const recipient_id = temp['recipient_id'];
					const recipient_msg = temp['text'];

					const response_temp = {
						sender: 'bot',
						recipient_id: recipient_id,
						msg: recipient_msg,
					};
					setbotTyping(false);

					setChat((chat) => [...chat, response_temp]);
				}
			});
	};


	const chatEngineWindow = {
		width: '100%',
		backgroundColor: '#fff',
	};

	const stylecard = {
		height: '100%',
		maxWidth: '420px',
		paddingLeft: '0px',
		paddingRight: '0px',
		boxShadow: '0 16px 20px 0 rgba(0,0,0,0.4)',
	};
	const styleFooter = {
		height: '65px',
		width: '100%',
		backgroundColor: '#00a8ff',
	};
	const styleBody = {
		paddingTop: '10px',
		height: '28rem',
		overflowY: 'auto',
		overflowX: 'hidden',
	};
	return (
		<div
			className='transition-5'
			style={
				({
					height: props.visible ? '100%' : '0px',
					zIndex: props.visible ? '100' : '0',
				},
				{ chatEngineWindow })
			}
		>
			<div className={styles.container}>
				<div className='row justify-content-center'>
					<div className='card' style={stylecard}>
						<div className='cardBody' id='messageArea' style={styleBody}>
							<div className='row msgarea'>
								{chat.map((user, key) => (
									<div key={key}>
										{user.sender === 'bot' ? (
											<div className={styles.msgalignstart}>
												<BiBot className={styles.botIcon} />
												<h5 className={styles.botmsg}>{user.msg}</h5>
											</div>
										) : (
											<div className={styles.msgalignend}>
												<h5 className={styles.usermsg}>{user.msg}</h5>
												<BiUser className={styles.userIcon} />
											</div>
										)}
									</div>
								))}
							</div>
						</div>
						<div className='cardFooter text-white' style={styleFooter}>
							<div className='row'>
								<form style={{ display: 'flex' }} onSubmit={handleSubmit}>
									<div className='col-10' style={{ paddingRight: '5px' }}>
										<input
											onChange={(e) => setInputMessage(e.target.value)}
											value={inputMessage}
											type='text'
											className={styles.msginp}
										></input>
									</div>
									<div className='col-2 cola'>
										<button type='submit' className={styles.circleBtn}>
											<IoMdSend className={styles.sendBtn} />
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChatEngine;
