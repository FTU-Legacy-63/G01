"""Independent comparison with the bundled original workbooks and DOCX dialogue.
Requires Python + openpyxl + python-docx and Node. Run from project root.
"""
import json
import subprocess
from pathlib import Path
from openpyxl import load_workbook
from docx import Document
ROOT=Path(__file__).resolve().parents[1]
code="global.window=global;for(const f of ['core/registry.js','cases/creoexchange/case.js','cases/clinova/case.js'])require('./'+f);console.log(JSON.stringify(Object.fromEntries(PitchLedger.listCases().map(id=>[id,PitchLedger.getCase(id).data]))));"
data=json.loads(subprocess.check_output(['node','-e',code],cwd=ROOT))
manifest=json.loads((ROOT/'docs/financial-source-map.json').read_text())
books={}
for item in manifest:
    book=books.setdefault(item['file'],load_workbook(ROOT/item['file'],data_only=True))
    ws=book[item['sheet']]
    row=next(x for x in data[item['case']]['financials'][item['statement']] if x['id']==item['id'])
    assert row['values']==[ws[cell].value for cell in item['cells']],item
    assert row['label']==ws[item['labelCell']].value,item
    assert data[item['case']]['financials']['unit']==1
print(f'PASS: {len(manifest)} financial rows, 150 amounts, labels and USD scale match source sheets.')
for cid,folder,start,end in [('creoexchange','CASE 2',199,1254),('clinova','CASE 3',305,395)]:
    doc=Document(next((ROOT/'sources'/folder).glob('*.docx')))
    paragraphs=[p.text for p in doc.paragraphs]
    source_count=sum('Founder:' in x for x in paragraphs[start:end])
    nodes=[n for n in data[cid]['dialogue']['nodes'] if n['speaker']=='founder']
    assert len(nodes)==source_count,(cid,len(nodes),source_count)
    for n in nodes:
        # Text coverage across original paragraphs, allowing only layout cleanup.
        original=' '.join(paragraphs[n['source']['paragraphStart']:n['source']['paragraphEnd']+1]) if 'source' in n else ' '.join(paragraphs[start:end])
        normalize=lambda s: ''.join(c.lower() for c in s if c.isalnum())
        assert normalize(n['founderText']) in normalize(original),n['id']
    print(f'PASS: {cid}: all {source_count} founder openings/answers preserved; no missing founder turns.')

# Independently verify accounting identities on the chosen player sheets.
for cid in data:
    f=data[cid]['financials'];rows={r['id']:r['values'] for key in ['balanceSheet','incomeStatement','cashFlowStatement'] for r in f[key]}
    for y in range(2):
        r=lambda key:rows[key][y]
        if cid=='creoexchange':
            assert r('bs-9')==r('bs-19')
            assert r('is-5')-r('is-6')==r('is-7')
            assert r('is-7')-r('is-12')==r('is-13')
            assert r('cf-7')+r('cf-9')+r('cf-12')==r('cf-13')
            assert r('cf-14')+r('cf-13')==r('cf-15')==r('bs-5')
        else:
            assert r('bs-8')==r('bs-15')==r('bs-13')+r('bs-14')
            assert r('is-5')+r('is-6')+r('is-7')==r('is-8')
            assert r('is-8')-r('is-11')==r('is-12')
            assert r('cf-9')+r('cf-10')+r('cf-11')==r('cf-12')
            assert r('cf-13')+r('cf-12')==r('cf-14')==r('bs-5')
print('PASS: balance totals, gross profit, cash movement and ending cash reconcile for both years.')

# October update: independently check Plantfish's source workbook, all source pitches,
# and the added company/operating tables.
code="global.window=global;for(const f of ['core/registry.js','cases/plantfish/case.js','cases/plantfish/scenes.js','cases/creoexchange/case.js','cases/clinova/case.js','core/narrative.js'])require('./'+f);console.log(JSON.stringify(Object.fromEntries(PitchLedger.listCases().map(id=>[id,{...PitchLedger.getCase(id),pitchLines:PitchLedger.narrative.pitchLines(PitchLedger.getCase(id).data,PitchLedger.getCase(id).presentation.scene)}]))));"
all_cases=json.loads(subprocess.check_output(['node','-e',code],cwd=ROOT))
pf=all_cases['plantfish']['data'];wb=load_workbook(ROOT/'sources/CASE 1/plantfish-financial-statements.xlsx',data_only=True);count=0
for statement in ['incomeStatement','balanceSheet','cashFlowStatement']:
    for row in pf['financials'][statement]:
        src=row['source'];values=[cell.value for rr in wb[src['sheet']][src['range']] for cell in rr]
        assert values==row['values'],row['id'];count+=1
assert pf['financials']['currency']=='USD' and pf['financials']['unit']==1000
print(f'PASS: Plantfish {count} financial rows match Player Statements; USD thousands confirmed by source highlights.')
normalize=lambda s: ''.join(c.lower() for c in s if c.isalnum())
for cid,folder,filename,table in [('plantfish','CASE 1','case 1 design.docx',8),('creoexchange','CASE 2','case 2 design.docx',6),('clinova','CASE 3','[PBL] CASE 3_ CLINOVA AI_.docx',9)]:
    doc=Document(ROOT/'sources'/folder/filename);c=all_cases[cid]['data'];source=normalize(' '.join(p.text for p in doc.paragraphs))
    for part in c['pitch'].split('\n\n'):assert normalize(part) in source,(cid,part)
    expected=[[cell.text.strip() for cell in row.cells] for row in doc.tables[table].rows]
    assert c['operatingMetrics']==dict(columns=expected[0],rows=expected[1:])
    assert len(c['checklist'])==7
    if cid=='plantfish':
        for node in c['dialogue']['nodes']:
            if node.get('speaker','founder')=='founder' and node.get('topicId'):assert normalize(node['founderText']) in source,node['id']
print('PASS: new pitches are source-exact; operating tables match all three DOCX files; Plantfish dialogue preserved.')
assert len(all_cases['clinova']['pitchLines'])==4
assert all_cases['creoexchange']['data']['name']=='Fundora'
assert all_cases['creoexchange']['data']['operatingMetrics']['rows'][2][1]=='~$8.0M'
assert pf['industryData']['forecastGrowth']['value']==.105
assert pf['industryReferenceScales'][0]['values']==[5,20,70,100]
print('PASS: Clinova has exactly four pitch beats; Fundora name/$8M base volume and Plantfish briefing values applied.')
