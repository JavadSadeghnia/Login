import React, { useEffect, useState } from 'react';
import './assets/LoginPage.css'

let color = 'green'
let flagEmail = 0
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const LoginPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const logout = () => {
        location.reload()
    };

    const [data, setData] = useState([])
    useEffect(() => {
        fetch('https://6575f20e0febac18d4037a7e.mockapi.io/myapi/vers1/input')
            .then(res => res.json())
            .then(myData => {
                setData(myData)
            })
    }, [])

    const RegisterBTN = () => {

        const turnRed = (notice) => {
            color = 'red'
            document.getElementById('alert').style.background = '#ff00006c'
            document.getElementById('alert').innerText = notice
            document.getElementById('alert').style.top = 0
            setTimeout(() => {
                color = 'blue'
                document.getElementById('alert').style.top = '-60px'
            }, 2000);
        }

        if (emailRegex.test(email)) {
            data.map((element) => {
                console.log(data.email);
                if (element.email === email) {
                    flagEmail = 1
                }
            })
            if (flagEmail === 1) {
                turnRed('This Email Has Already Been Registered')
                setTimeout(() => {
                    window.location.reload()
                }, 2500);
            } else {
                if (firstName != '' && lastName != '' && email != '' && password != '') {
                    //fetch to database
                    const newTask = {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        password: password,
                    };
                    fetch('https://6575f20e0febac18d4037a7e.mockapi.io/myapi/vers1/input', {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        // Send your data in the request body as JSON
                        body: JSON.stringify(newTask)
                    }).then(res => {
                        if (res.ok) {
                            return res.json();
                        }
                        // handle error
                    }).then(task => {
                        // do something with the new task
                    }).catch(error => {
                        // handle error
                    })


                    color = 'yellow'
                    document.getElementById('alert').style.background = '#f6ff006c'
                    document.getElementById('alert').innerText = 'Successful Registration'
                    document.getElementById('alert').style.top = 0
                    setTimeout(() => {
                        window.location.reload()
                    }, 2000);
                } else {
                    turnRed('Please Fill All Inputs')
                }
            }
        } else if (email === '') {
            turnRed('Please Fill All Inputs')
        } else {
            turnRed('Your Email Is Not Valid')
        }
    }

    let flag = 0
    data.map((element) => {
        if (element.email === email && element.password === password) {
            flag = 1
        }
    })

    const loginBTN = () => {
        if (flag == 1) {
            color = 'yellow'
            document.getElementById('alert').style.background = '#f6ff006c'
            document.getElementById('alert').innerText = 'Successful Login'
            document.getElementById('alert').style.top = 0

            setTimeout(() => {
                color = 'white'
                document.getElementById('alert').style.top = '-60px'
                // go to table (Admin panel)
                document.querySelector('.box').innerHTML = `<section id='logout'>Logout</section><div>Admin Panel</div><div><div>ID</div><div>First Name</div><div>Last Name</div><div>Email</div></div>`
                data.map((element) => {
                    let a = document.createElement('div')
                    a.innerHTML = `<div>${element.id}</div><div>${element.firstName}</div><div>${element.lastName}</div><div>${element.email}</div>`
                    document.querySelector('.box').appendChild(a)
                })
                document.querySelector('.box').classList.add('box2')
                document.querySelector('.box').classList.remove('box')
                document.getElementById('logout').addEventListener('click', () => {
                    location.reload()
                })

            }, 1000);

        } else {
            color = 'red'
            document.getElementById('alert').style.background = '#ff00006c'
            document.getElementById('alert').innerText = 'Login Failed'
            document.getElementById('alert').style.top = 0
            setTimeout(() => {
                color = 'green'
                document.getElementById('alert').style.top = '-60px'
            }, 2000);
        }
    }

    const registerBTN = () => {
        document.getElementsByClassName('box')[0].style.visibility = 'hidden'
        document.querySelector('.box').classList.remove('box')
        document.getElementsByClassName('boxR')[0].style.visibility = 'visible'
        color = 'blue'
    }

    return (
        <>
            <MatrixRain />
            <div id='alert'></div>
            <div className='box'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="text" value={email} onChange={handleEmailChange} required spellCheck="false" />
                        <label>Email</label>
                    </label>
                    <br />
                    <label>
                        <input type="password" value={password} onChange={handlePasswordChange} required spellCheck="false" />
                        <label>Password</label>
                    </label>
                    <br />
                    <button onClick={loginBTN} className="btn draw-border" type="submit">Login</button>
                    <button onClick={registerBTN} className="btn draw-border" type='button'>Register</button>
                </form>
            </div >
            <div className='boxR'>
                <section onClick={logout} id='logout'>Login</section>
                <form onSubmit={handleSubmit}>
                    <label>
                        <input type="text" value={firstName} onChange={handleFirstNameChange} required spellCheck="false" />
                        <label>First Name</label>
                    </label>
                    <br />
                    <label>
                        <input type="text" value={lastName} onChange={handleLastNameChange} required spellCheck="false" />
                        <label>Last Name</label>
                    </label>
                    <br />
                    <label>
                        <input type="text" value={email} onChange={handleEmailChange} required spellCheck="false" />
                        <label>Email</label>
                    </label>
                    <br />
                    <label>
                        <input type="password" value={password} onChange={handlePasswordChange} required spellCheck="false" />
                        <label>Password</label>
                    </label>
                    <br />
                    <button onClick={RegisterBTN} className="btn draw-border" type='button'>Register</button>
                </form>
            </div >
        </>
    );
};


//****************** MatrixRain *********************

const MatrixRain = () => {
    useEffect(() => {
        const canvas = document.getElementById('matrix-rain');
        const ctx = canvas.getContext('2d');
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const columns = 100;
        const fontSize = 15;
        const drops = [];
        const speed = 5; // Adjust this value to control the speed

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        for (let i = 0; i < columns; i++) {
            drops[i] = Math.floor(Math.random() * canvas.height);
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = color; // Matrix green color
            ctx.font = `${fontSize}px Matrix`;

            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }

                drops[i]++;
            }
        };

        const animateMatrix = () => {
            draw();
            setTimeout(() => requestAnimationFrame(animateMatrix), 70);
        };

        animateMatrix();

        return () => cancelAnimationFrame(animateMatrix);
    }, []);

    return <canvas id="matrix-rain" />;
};

export default LoginPage;