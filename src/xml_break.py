import os
from xml.sax import parse
from xml.sax.saxutils import XMLGenerator
import glob
# from tqdm import tqdm
import shutil
from bs4 import BeautifulSoup
from xml.dom.minidom import parseString
from xml.dom import minidom
import re

'''

class CycleFile(object):

    def __init__(self, filename):
        self.basename, self.ext = os.path.splitext(filename)
        self.index = 0
        self.open_next_file()

    def open_next_file(self):
        self.index += 1
        self.file = open(self.name(), 'wb')

    def name(self):
        return '%s-p%s%s' % (self.basename, str(self.index).zfill(4), self.ext)

    def cycle(self):
        self.file.close()
        self.open_next_file()

    def write(self, str):
        self.file.write(str)

    def close(self):
        self.file.close()

class XMLBreaker(XMLGenerator):
    
    def __init__(self, break_into=None, break_after=1000, out=None, *args, **kwargs):
        XMLGenerator.__init__(self, out, encoding='utf-8', *args, **kwargs)
        self.out_file = out
        self.break_into = break_into
        self.break_after = break_after
        self.context = []
        self.count = 0

    def startElement(self, name, attrs):
        XMLGenerator.startElement(self, name, attrs)
        self.context.append((name, attrs))

    def endElement(self, name):
        XMLGenerator.endElement(self, name)
        self.context.pop()
        if name == self.break_into:
            self.count += 1
            if self.count == self.break_after:
                self.count = 0
                for element in reversed(self.context):
                    self.out_file.write("\n".encode('utf-8'))
                    XMLGenerator.endElement(self, element[0])
                self.out_file.cycle()
                XMLGenerator.startDocument(self)
                for element in self.context:
                    XMLGenerator.startElement(self, *element)

file = "data/input/DKB01.xml"
# print(file)
# ofile = file.replace("input", "output")

odir1 = "data/output"

def extract_text(odir1, file):

    soup = BeautifulSoup(open(file,'r'), "xml")

    text = soup.find("text")

    ofile = os.path.join(odir1, os.path.basename(file))

    with open(ofile, "wb") as file:
        file.write(str(text).encode('utf-8'))

    return ofile

ofile1 = extract_text(odir1, file)

def cp_to_xmls(odir1, file):
    odir = odir1 + "/tmp"
    os.makedirs(odir, exist_ok=True)
    ofile = os.path.join(odir, os.path.basename(file))
    shutil.copy(file, ofile)
    return ofile

# ifile = 
ofile = cp_to_xmls(odir1, ofile1)

def spl(ofile):
    filename, break_into, break_after = ofile, "pb", "1" # sys.argv[1:]
    parse(filename, XMLBreaker(break_into, int(break_after), out=CycleFile(filename)))

    # 後始末
    os.remove(ofile)

    return os.path.dirname(ofile)

o_dir = spl(ofile)

'''

file = "data/input/DKB01.xml"
ofile = "data/output/DKB01.xml"


def format_xml_string(xml_string):
    """xml文字列を整形する

    Parameters:  
    * `xml_string` - xml文字列 (str)

    Returns:  
    * 整形されたxml文字列 (str)
    """

    # return parseString(xml_string).toprettyxml(indent="  ")

    reparsed = minidom.parseString(xml_string)
    pretty = re.sub(r"[\t ]+\n", "", reparsed.toprettyxml(indent="\t"))
    pretty = pretty.replace(">\n\n\t<", ">\n\t<")
    return pretty


def merge(ofile, original_path):

    # top_dir = os.path.dirname(o_dir)

    # file_t = os.path.join(top_dir, "tmp.xml")

    soup = BeautifulSoup(open(original_path, 'r'), "xml")

    filename_o = os.path.basename(ofile)

    text = soup.find("text")

    children = text.findChildren()

    for child in children:
        child.decompose()

    dir2 = os.path.dirname(ofile)

    files = glob.glob(os.path.join(dir2 + "/tmp", "*.xml"))

    files.sort()

    # text = soup.new_tag("text")
    # text

    for file in files: # [0:10]:
        filename = os.path.basename(file)
        id = filename.replace(".xml", "").split("-p")[-1]
        soup2 = BeautifulSoup(open(file, 'r'), "xml")

        text2 = soup2.find("text")

        ab = soup.new_tag("div")
        ab["xml:id"] = "tjv-" + id
        ab["type"] = "tjv"

        children = text2.findChildren()

        for child in children:
            ab.append(child)

        text.append(ab)

    ofile = os.path.join(dir2, filename_o)

    with open(ofile, "w") as file:
        xml_string = str(soup).encode('utf-8')
        # format_xml_string(xml_string)
        xml_string = format_xml_string(xml_string)
        # print(xml_string)
        file.write(xml_string)

    

merge(ofile, file)
