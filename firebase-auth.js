// ==========================================================
// NmapSSL — Firebase Authentication
// Handles real sign-up / sign-in / sign-out for the #login
// section in index.html, using Firebase Email/Password auth.
// ==========================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCxjBdQGvgcX_vgzk_a_AV-DRHBeQXSvb8",
  authDomain: "nmap-9081f.firebaseapp.com",
  projectId: "nmap-9081f",
  storageBucket: "nmap-9081f.firebasestorage.app",
  messagingSenderId: "467573679692",
  appId: "1:467573679692:web:907ebb7ee0165927a2f6e9",
  measurementId: "G-TBNGFL1B0B",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  const authForms = document.getElementById("authForms");
  const authSignedIn = document.getElementById("authSignedIn");
  const signedInEmail = document.getElementById("signedInEmail");
  const logoutBtn = document.getElementById("logoutBtn");

  const form = document.getElementById("loginForm");
  const errorBox = document.getElementById("errorBox");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const togglePass = document.getElementById("togglePass");
  const submitBtn = document.getElementById("submitBtn");
  const formTitle = document.getElementById("formTitle");
  const formKicker = document.getElementById("formKicker");
  const formSub = document.getElementById("formSub");
  const rememberRow = document.getElementById("rememberRow");
  const forgotLink = document.getElementById("forgotLink");
  const toggleModeLine = document.getElementById("toggleModeLine");
  const toggleModeLink = document.getElementById("toggleModeLink");

  if (!form) return; // login section not on this page

  let mode = "signin"; // or "signup"

  function setMode(newMode) {
    mode = newMode;
    hideError();
    if (mode === "signin") {
      formKicker.textContent = "welcome back";
      formTitle.textContent = "Sign in to your account";
      formSub.textContent = "Access your scan history and saved targets.";
      submitBtn.textContent = "Sign in →";
      rememberRow.style.display = "flex";
      toggleModeLine.innerHTML = 'Don\'t have an account? <a href="#" id="toggleModeLink">Create one</a>';
    } else {
      formKicker.textContent = "get started";
      formTitle.textContent = "Create your account";
      formSub.textContent = "Sign up to start saving your scan targets.";
      submitBtn.textContent = "Create account →";
      rememberRow.style.display = "none";
      toggleModeLine.innerHTML = 'Already have an account? <a href="#" id="toggleModeLink">Sign in</a>';
    }
    // re-bind, since innerHTML replaced the link node
    document.getElementById("toggleModeLink").addEventListener("click", (e) => {
      e.preventDefault();
      setMode(mode === "signin" ? "signup" : "signin");
    });
  }

  function showError(message) {
    errorBox.textContent = message;
    errorBox.style.color = "var(--danger)";
    errorBox.style.background = "rgba(229,98,106,0.08)";
    errorBox.style.borderColor = "rgba(229,98,106,0.3)";
    errorBox.classList.add("show");
  }

  function showSuccess(message) {
    errorBox.textContent = message;
    errorBox.style.color = "var(--accent)";
    errorBox.style.background = "rgba(79,209,174,0.08)";
    errorBox.style.borderColor = "rgba(79,209,174,0.3)";
    errorBox.classList.add("show");
  }

  function hideError() {
    errorBox.classList.remove("show");
  }

  function friendlyError(code) {
    switch (code) {
      case "auth/invalid-email":
        return "That email address looks invalid.";
      case "auth/user-not-found":
        return "No account found with that email.";
      case "auth/wrong-password":
      case "auth/invalid-credential":
        return "Incorrect email or password.";
      case "auth/email-already-in-use":
        return "An account with that email already exists.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/too-many-requests":
        return "Too many attempts. Try again later.";
      default:
        return "Something went wrong. Please try again.";
    }
  }

  if (togglePass && passwordInput) {
    togglePass.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      togglePass.textContent = isPassword ? "HIDE" : "SHOW";
    });
  }

  // initial bind for the "Create one" link
  toggleModeLink.addEventListener("click", (e) => {
    e.preventDefault();
    setMode(mode === "signin" ? "signup" : "signin");
  });

  forgotLink.addEventListener("click", async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    if (!email) {
      showError("Enter your email above first, then click 'Forgot password?'.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      showSuccess("Password reset email sent — check your inbox.");
    } catch (err) {
      showError(friendlyError(err.code));
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      showError("Please fill in both fields.");
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Please wait…";

    try {
      if (mode === "signup") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      // onAuthStateChanged below will handle the UI swap
    } catch (err) {
      showError(friendlyError(err.code));
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      await signOut(auth);
    });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      authForms.style.display = "none";
      authSignedIn.style.display = "block";
      signedInEmail.textContent = user.email;
    } else {
      authForms.style.display = "block";
      authSignedIn.style.display = "none";
      form.reset();
    }
  });
});