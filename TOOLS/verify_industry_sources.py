import json,re,zipfile,xml.etree.ElementTree as ET
from pathlib import Path
r=Path(__file__).resolve().parents[1]
data={}
for folder in (r/'cases').iterdir():
 f=folder/'presentation.js'
 if f.exists():
  s=f.read_text();payload=s.split('Object.assign(d.presentation,',1)[1].rsplit(');})();',1)[0]
  data[folder.name]=json.loads(payload)['industryBriefing']
count=0
for key,d in data.items():
 with zipfile.ZipFile(r/d['source']) as z:root=ET.fromstring(z.read('word/document.xml'))
 ns={'w':'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
 lines=[]
 for p in root.findall('.//w:p',ns):
  text=''.join((t.text or '') if t.tag.endswith('}t') else '\n' if t.tag.endswith('}br') else '' for t in p.iter())
  lines.extend(text.splitlines())
 source=[]
 for line in lines:
  if ':' not in line or '(' not in line.split(':',1)[1]:continue
  rhs=line.split(':',1)[1];num=rhs.split('(',1)[0].strip().replace('−','-').replace('–','/')
  if not re.match(r'^-?\d',num):continue
  num=re.sub(r'(?<=\d)-(?=\d)','/',num)
  values=[float(x) for x in re.findall(r'-?\d+(?:\.\d+)?',num)]
  labels=re.split(r'\s+[–−-]\s+',rhs.rsplit('(',1)[1].rstrip(') '))
  source.append((values,labels))
 assert len(source)==len(d['metrics']),(key,source)
 for metric,(values,labels) in zip(d['metrics'],source):
  assert metric['values']==values,(key,metric['name'],values)
  norm=lambda x:x.lower().replace('-','').replace(' ','')
  assert list(map(norm,metric['labels']))==list(map(norm,labels)),(key,metric['labels'],labels)
  count+=len(values)
 print(key,':',len(source),'scales match source values AND category labels')
print(count,'numeric reference points verified')
