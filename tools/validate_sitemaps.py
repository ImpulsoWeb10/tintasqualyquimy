import xml.etree.ElementTree as ET
import os
reports=[]
# root sitemap
root_sitemap='tintasqualyquimy/sitemap.xml'
if os.path.exists(root_sitemap):
    try:
        tree=ET.parse(root_sitemap)
        reports.append('root sitemap parsed, root tag: '+tree.getroot().tag)
        urls=len(tree.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}url'))
        reports.append('root sitemap URL entries: '+str(urls))
    except Exception as e:
        reports.append('root sitemap parse error: '+str(e))
else:
    reports.append('root sitemap missing')
# projects sitemap
proj_sitemap='projects/landing-pages/sitemap.xml'
if os.path.exists(proj_sitemap):
    try:
        tree=ET.parse(proj_sitemap)
        root=tree.getroot()
        reports.append('projects sitemap parsed, root tag: '+root.tag)
        if 'sitemaps.org' not in root.tag:
            reports.append('projects sitemap namespace seems non-standard')
        urls=len(root.findall('.//{http://www.sitemaps.org/schemas/sitemap/0.9}url'))
        reports.append('projects sitemap URL entries using standard ns: '+str(urls))
    except Exception as e:
        reports.append('projects sitemap parse error: '+str(e))
else:
    reports.append('projects sitemap missing')
# root robots
robots='tintasqualyquimy/robots.txt'
if os.path.exists(robots):
    txt=open(robots,encoding='utf-8',errors='ignore').read()
    reports.append('root robots.txt found')
    if 'Sitemap:' in txt or 'sitemap:' in txt:
        reports.append('robots has Sitemap directive: '+[l for l in txt.splitlines() if l.lower().startswith('sitemap:')][0])
    else:
        reports.append('robots has no Sitemap directive')
    for bot in ['Googlebot','Bingbot']:
        reports.append(bot + (" appears in robots" if bot.lower() in txt.lower() else " not explicitly mentioned (defaults apply)"))
else:
    reports.append('root robots.txt missing')
print('\n'.join(reports))
