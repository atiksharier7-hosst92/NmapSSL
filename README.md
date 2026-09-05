# NmapSSL

```bash
git clone https://github.com/atiksharier7-hosst92/NmapSSL.git
cd NmapSSL
pip install -r requirements.txt
```

##  F2F 

```bash
python nmapssl.py -t <target> -p <port(s)>
```

**Example**

```bash
python nmapssl.py -t example.com -p 443
```

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
