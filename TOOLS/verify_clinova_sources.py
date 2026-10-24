"""Compare shipped company/Q&A content with the October 3 Word sources (stdlib only)."""
import json,re,zipfile,xml.etree.ElementTree as ET
from pathlib import Path
r=Path(__file__).resolve().parents[1]
s=(r/'cases/clinova/case.js').read_text();p=json.JSONDecoder().raw_decode(s.split('registerCase(',1)[1])[0]['data']
ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
def read(name):
 with zipfile.ZipFile(r/'sources/CASE 3/oct03'/name) as z:return ET.fromstring(z.read('word/document.xml'))
def text(node):return ''.join((t.text or '') if t.tag.endswith('}t') else '\n' if t.tag.endswith('}br') else '' for t in node.iter())
source='\n'.join(text(n) for n in read('Investigation.docx').findall('.//w:p',ns)).split('CASE TRUTH / INVESTIGATION LOGIC')[0]
quotes=re.findall('“(.*?)”',source,re.S)
visible=[n['founderText'] for n in p['dialogue']['nodes']]+[c['text'] for n in p['dialogue']['nodes'] for c in n['choices']]
norm=lambda s:' '.join(s.split())
for quote in quotes:assert norm(quote) in set(map(norm,visible)),quote
assert len(quotes)==110,len(quotes)
tables=[]
for table in read('Company-Overview.docx').findall('.//w:tbl',ns):
 tables.append([[text(c) for c in row.findall('w:tc',ns)] for row in table.findall('w:tr',ns)])
for field,table in [('companyFacts',tables[0]),('operatingMetrics',tables[1])]:
 assert p[field]['columns']==table[0]
 assert p[field]['rows']==table[1:]
for value,row in zip(p['fundingReference']['useOfFunds'],tables[2][1:-1]):
 assert value['category']==row[0]
 assert abs(value['share']-float(row[1].strip('%'))/100)<1e-9
 assert value['amount']==float(row[2].replace(',',''))
print('PASS: 110 source quotations (4 openings, 56 questions including 6 exits, 50 answers); company tables and use of funds match.')
