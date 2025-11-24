;;

;; Domain:     **gustavohesse**.com.br.

;; Exported:   2025-11-11 19:36:56

;;

;; This file is intended for use for informational and archival

;; purposes ONLY and MUST be edited before use on a production

;; DNS server.  In particular, you must:

;;   -- update the SOA record with the correct authoritative name server

;;   -- update the SOA record with the contact e-mail address information

;;   -- update the NS record(s) with the authoritative name servers for this domain.

;;

;; For further information, please consult the BIND documentation

;; located on the following website:

;;

;; http://www.isc.org/

;;

;; And RFC 1035:

;;

;; http://www.ietf.org/rfc/rfc1035.txt

;;

;; Please note that we do NOT offer technical support for any use

;; of this zone data, the BIND name server, or any other third-party

;; DNS software.

;;

;; Use at your own risk.

;; SOA Record

gustavohesse.com.br	3600	IN	SOA	brodie.ns.cloudflare.com. dns.cloudflare.com. 2051455641 10000 2400 604800 3600



;; NS Records

gustavohesse.com.br.	86400	IN	NS	brodie.ns.cloudflare.com.

gustavohesse.com.br.	86400	IN	NS	janet.ns.cloudflare.com.



;; A Records

ftp.gustavohesse.com.br.	1	IN	A	187.110.162.139 ; cf\_tags=cf-proxied:true

gustavohesse.com.br.	1	IN	A	187.110.162.139 ; cf\_tags=cf-proxied:true

mail.gustavohesse.com.br.	1	IN	A	187.110.162.139 ; cf\_tags=cf-proxied:false

pma.gustavohesse.com.br.	1	IN	A	187.110.162.139 ; cf\_tags=cf-proxied:true

srv1.gustavohesse.com.br.	1	IN	A	187.110.162.139 ; cf\_tags=cf-proxied:false

www.gustavohesse.com.br.	1	IN	A	187.110.162.139 ; cf\_tags=cf-proxied:true



;; CNAME Records

webmail.gustavohesse.com.br.	1	IN	CNAME	mail.gustavohesse.com.br. ; cf\_tags=cf-proxied:true



;; MX Records

gustavohesse.com.br.	1	IN	MX	10 mail.gustavohesse.com.br.



;; TXT Records

default.\_domainkey.gustavohesse.com.br.	1	IN	TXT	"v=DKIM1; t=s; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4I18mGMEQpU0XikNUl3LfK+F9kbG0oCV0cDchfeS5Yh0dPRtg/JgIDSYssCxeHDSGeuGtJuG9wgWIfHWdh7/Ac9x5WGvV6RU2Kxkz3dPOCjgfXnlwzOJ3Tf+7+knIiS+bMUpORg47+YFemvxqbL3xJxKI+twBn3i4O7zZdXahi5/+c03HRkNS7BeDqa/9l83oh/" "B5LW9TZ5Yq96j1tSzOQRQaCwgB7Zgd/sQyRQxDOd981b0vtJqKS1n5UmEuSpkAOshBYCEW3ik6WtnZK9F68QQ6HKeP/8ftjZBAtmUGBfwXKhWe/UHITO7YPBX5wKfrTODHpMbEDANxmYptG3NCQIDAQAB"

\_dmarc.gustavohesse.com.br.	1	IN	TXT	"v=DMARC1; p=none; rua=mailto:postmaster@gustavohesse.com.br; ruf=mailto:postmaster@gustavohesse.com.br; fo=1; adkim=s; aspf=s"

gustavohesse.com.br.	3600	IN	TXT	"v=spf1 a mx ip4:187.110.162.138 ip4:187.110.162.139 ~all"



