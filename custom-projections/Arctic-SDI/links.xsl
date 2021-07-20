<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
                xmlns:h="http://www.w3.org/1999/xhtml/" xmlns="http://www.w3.org/1999/xhtml" exclude-result-prefixes="h html">
  <xsl:output omit-xml-declaration="yes"/>
  <xsl:template match="node() | @*">
    <xsl:copy>
      <xsl:apply-templates select="node() | @*"/>
    </xsl:copy>
  </xsl:template>
  <xsl:template  match="h:head/node()[position()=last()]" xpath-default-namespace="http://www.w3.org/1999/xhtml/" >
    <xsl:copy>
      <xsl:apply-templates select="node() | @*"/>
    </xsl:copy>
    <style>
      .asdi-countries {
        fill: #efefd5; fill-opacity: 0.2; stroke-width: 1; stroke: #d2c2c1; stroke-opacity: 1; stroke-dasharray: 3;
      }
    </style>
  </xsl:template>
<!--  <xsl:template match="h:link[@projection]"/>-->
  <xsl:template match="h:meta[@name='projection']">
    <meta name="projection">
      <xsl:attribute name="content">EPSG<xsl:value-of select="substring-after(@content,'EPSG:')"/></xsl:attribute>
    </meta>
    
  </xsl:template>
  <xsl:template match="h:body">
    <xsl:copy>
        <extent>
          <xsl:attribute name="units">EPSG<xsl:value-of select="substring-after(//h:meta[@name='projection']/@content,'EPSG:')"></xsl:value-of></xsl:attribute>
          <input type="zoom" name="TileMatrix" min="0" max="11" value="0"/>
          <input type="location" name="TileCol" axis="column" units="tilematrix" min="0" max="1"/>
          <input type="location" name="TileRow" axis="row" units="tilematrix" min="0" max="1"/>
          <link rel="tile">
            <xsl:attribute name="tref">http://basemap.arctic-sdi.org/mapcache/wmts/1.0.0/arctic_cascading/default/<xsl:value-of select="substring-after(//h:meta[@name='projection']/@content,'EPSG:')"></xsl:value-of>/{TileMatrix}/{TileRow}/{TileCol}.png</xsl:attribute>
          </link>
        </extent>
      <xsl:apply-templates select="node() | @*"/>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="h:feature[h:featurecaption = 'United States of America']">
    <xsl:copy>
      <xsl:attribute name="id">
        <xsl:value-of select="'usa'"/>
      </xsl:attribute>
      <xsl:apply-templates select="node() | @*[local-name() != 'id'] "/>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="h:geometry[ancestor::h:feature[h:featurecaption = 'United States of America']]">
    <xsl:copy>
      <map-a>
        <xsl:attribute name="href">usa/links.mapml</xsl:attribute>
        <xsl:apply-templates select="node() | @*"/>
      </map-a>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="h:feature">
    <xsl:copy>
      <xsl:attribute name="id">
        <xsl:value-of select="translate(h:featurecaption, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>
      </xsl:attribute>
      <xsl:apply-templates select="node() | @*[local-name() != 'id'] "/>
    </xsl:copy>
  </xsl:template>
  <xsl:template match="h:geometry">
    <xsl:copy>
      <map-a>
        <xsl:attribute name="href"><xsl:value-of select="translate(../h:featurecaption, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz')"/>/links.mapml</xsl:attribute>
        <xsl:apply-templates select="node() | @*"/>
      </map-a>
    </xsl:copy>
  </xsl:template>
<!--  <xsl:template match="h:feature[h:featurecaption='United States Virgin Islands' || h:featurecaption='United States Minor Outlying Islands']">
    <xsl:apply-templates select="following-siblings::*"/>
  </xsl:template>-->
</xsl:stylesheet>