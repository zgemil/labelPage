print("Hello, World")

'''
open main.html
open combined.txt
open js/main.js
scan main.html until finding <script>
write to combined
write main.js to combined
write the main.html after </script>
'''
scriptStartTag = "<script"
scriptStopTag = "</script>"
writeFlag = False
with open("main.html", "rt") as mainHtml, open("js/main.js", "rt") as mainJs, open("combined.txt", "wt") as combined:
    for line in mainHtml:
        if scriptStartTag in line:
            combined.write(line[:line.index(scriptStartTag)+len(scriptStartTag)])
            combined.write(">\n")
            break
        else:        
            combined.write(line)
    for line in mainJs:
        combined.write(line)
    for line in mainHtml:
        if scriptStopTag in line:
            writeFlag = True
        if writeFlag:
            combined.write(line)
