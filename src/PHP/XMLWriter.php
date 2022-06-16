<?php

namespace Laminas\XmlRpc\Generator;

//XML generator adapter based on XMLWriter
class XmlWriter extends AbstractGenerator
{
    protected $xmlWriter;

    // constructor
    protected function init()
    {
        $this->xmlWriter = new \XMLWriter();
        $this->xmlWriter->openMemory();
        $this->xmlWriter->startDocument('1.0', $this->encoding);
    }
    protected function openXmlElement($name)
    {
        $this->xmlWriter->startElement($name);
    }
    protected function writeTextData($text)
    {
        $this->xmlWriter->text($text);
    }
    protected function closeXmlElement($name)
    {
        $this->xmlWriter->endElement();
        return $this;
    }
  
    // emit
    public function saveXml()
    {
        return $this->xmlWriter->flush(false);
    }
}
