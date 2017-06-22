require "watir"

browser = Watir::Browser.new :firefox
browser.goto "192.168.15.4:8080/Responsive_Assets/frameads.html"

puts browser.title
browser.screenshot.save 'screenshots/screenshot0.png'

# clicar em um produto
browser.element(xpath: '//*[@id="prodct"]/li[1]/a').click
browser.screenshot.save 'screenshots/screenshot1.png'
# esperar e fechar
sleep 2
browser.windows.last.close

# esperar
sleep 2

# clicar em um elemento do menu
browser.element(xpath: '//*[@id="tab-77"]/a').click
browser.screenshot.save 'screenshots/screenshot2.png'
# esperar
sleep 2

# clicar na paginação
browser.element(xpath: '//*[@id="nxt"]').click
browser.screenshot.save 'screenshots/screenshot3.png'
# esperar
sleep 2

# clicar na caixa de texto e digitar
caixa_de_texto = browser.element(xpath: '//*[@id="in_sx"]')
caixa_de_texto.click
caixa_de_texto.set(:value, "ipa")
browser.screenshot.save 'screenshots/screenshot4.png'

# esperar
sleep 2

# fechar
browser.close
