# NmapSSL
<div align="center">

```
 _   _ __  __            _____ _____ _     
| \ | |  \/  |          / ____/ ____| |    
|  \| | \  / | __ _ _ __| (___| (___ | |    
| . ` | |\/| |/ _` | '_ \\___ \\___ \| |    
| |\  | |  | | (_| | |_) |___) |___) | |____
|_| \_|_|  |_|\__,_| .__/_____/_____/|______|
                   | |                      
                   |_|                      
```

### ⚡ Nmap-powered SSL/TLS Recon & Vulnerability Scanner ⚡

[![Nmap](https://img.shields.io/badge/Powered%20by-Nmap-red?logo=nmap&logoColor=white)](https://nmap.org/)
[![ATIK SHARIER REDOY](https://img.shields.io/badge/Powered%20by-ATIK-red?logo=nmap&logoColor=white)](https://nmap.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Made with ❤](https://img.shields.io/badge/Made%20with-%E2%9D%A4-red)]()

</div>

---

## 📖 About

**NmapSSL** combines the raw scanning power of **Nmap** with deep **SSL/TLS** inspection to give you a fast, no-nonsense view of a target's exposed services and how secure (or not) their encryption really is. Built for pentesters, sysadmins, and security researchers who want a quick recon-to-report workflow without juggling five different tools.

## ✨ Features

- Scan a target host or IP range using Nmap
- Detect open ports running SSL/TLS services
- Analyze SSL/TLS certificate details (issuer, validity, expiry, etc.)
- Check for supported protocols and cipher suites
- Flag common SSL/TLS misconfigurations and weaknesses
- Simple command-line usage
- Color-coded terminal output for quick triage 🚦
- Export results as JSON / TXT for reporting

## 🗂️ Table of Contents

- [Requirements](#-requirements)
- [Installation](#-installation)
- [Usage](#-usage)
- [Sample Output](#-sample-output)
- [Roadmap](#-roadmap)
- [Disclaimer](#️-disclaimer)
- [Contributing](#-contributing)
- [License](#-license)

## 📋 Requirements

- Python 3.8+
- [Nmap](https://nmap.org/download.html) installed and available in your system `PATH`
- OpenSSL (for certificate/cipher inspection)

## 🔧 Installation

```bash
git clone https://github.com/atiksharier7-hosst92/NmapSSL.git
cd NmapSSL
pip install -r requirements.txt
```

## 🚀 Usage

```bash
python nmapssl.py -t <target> -p <port(s)>
```

**Example:**

```bash
python nmapssl.py -t example.com -p 443
```

### Common options

| Flag | Description |
|------|-------------|
| `-t`, `--target` | Target IP address or domain |
| `-p`, `--port` | Port or port range to scan (default: 443) |
| `-o`, `--output` | Save results to a file |
| `-v`, `--verbose` | Show detailed scan output |

## 📄 Sample Output

```
[+] Scanning target: example.com
[+] Open port found: 443/tcp
[+] SSL/TLS certificate valid until: 2027-01-01
[+] Supported protocols: TLSv1.2, TLSv1.3
[!] Weak cipher suite detected: TLS_RSA_WITH_AES_128_CBC_SHA
```

## 🗺️ Roadmap

- [ ] Multi-threaded scanning for large IP ranges
- [ ] HTML report generation
- [ ] Integration with Shodan for passive recon
- [ ] Slack/Discord webhook notifications on findings

## ⚠️ Disclaimer

This tool is intended for **educational purposes and authorized security testing only**. Do not scan systems you do not own or have explicit permission to test. The author is not responsible for any misuse of this tool.

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

⭐ **If you find this project useful, consider giving it a star!** ⭐

</div>
