const form = document.querySelector('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');

const initLenis = () => {
    const lenis = new Lenis({
        content: document.querySelector('.frame'),

        lerp: 0.08,
        smoothWheel: true,
        orientation: 'vertical',
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
}

initLenis();

function sendEmail() {
    const body = `[PORTFOLIO-EMAIL] Name : ${name.value} <br>Email : ${email.value} <br>Sujet : ${subject.value} <br>Message : ${message.value}`;

    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "yulianguinand365@gmail.com",
        Password : "D0502270E8F25604C116DD5D972ACA365BB4",
        To : 'yulianguinand365@gmail.com',
        From : "yulianguinand365@gmail.com",
        Subject : "Portfolio-Email",
        Body : body,
    }).then(
      message => {
        if (message) {
            Swal.fire({
                title: "Succès!",
                text: "Email envoyé!",
                icon: "success"
            });
        }
      }
    );   
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    sendEmail();
})