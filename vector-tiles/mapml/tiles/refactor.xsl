<xsl:stylesheet version="1.0" xmlns:h="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" exclude-result-prefixes="h">
  <xsl:output omit-xml-declaration="yes"  indent="yes"/>

  <xsl:strip-space elements="*"/>
  
  <xsl:template match="node()|@*">
    <xsl:copy>
      <xsl:apply-templates select="node()|@*"/>
    </xsl:copy>
  </xsl:template>
  
  <xsl:template match="mapml">
    <mapml- xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()|@*"/>
    </mapml->
  </xsl:template>
  
  <xsl:template match="head">
    <map-head xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()"/>
      <!-- the meta projection and cs values are required to indicate how to interpret coordinates,
           because, I am suppressing the extent element (below) for which the behaviour
           is not defined (yet) on a per-tile basis i.e. what does it mean to
           receive a tile with map affordances embedded?
               -->
      <map-meta name="projection" content="OSMTILE"></map-meta>
      <map-meta name="cs" content="pcrs"></map-meta>
    </map-head>
  </xsl:template>
  <xsl:template match="title">
    <map-title xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()"/>
    </map-title>
  </xsl:template>
  <xsl:template match="meta">
    <map-meta xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="@*"/>
    </map-meta>
  </xsl:template>
  <xsl:template match="link">
    <map-link xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="@*"/>
    </map-link>
  </xsl:template>
  <xsl:template match="body">
    <map-body xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()"/>
    </map-body>
  </xsl:template>
  <!-- discard extent. How to handle extent element in a tile representation is
       undefined at present -->
  <xsl:template match="extent"/>  
<!--  <xsl:template match="extent">
    <map-extent xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="@*"/>
      <xsl:apply-templates select="node()"/>
    </map-extent>
  </xsl:template>
-->
  <xsl:template match="style">
    <map-style xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()"/>
    </map-style>
  </xsl:template>
  <xsl:template match="input">
    <map-input xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="@*"/>
    </map-input>
  </xsl:template>
  <xsl:template match="feature">
    <map-feature xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()|@*"/>
    </map-feature>
  </xsl:template>
  <xsl:template match="featurecaption">
    <map-featurecaption xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()|@*"/>
    </map-featurecaption>
  </xsl:template>
  <!-- discard properties for now. Tiled property handling is undefined -->
  <xsl:template match="properties"/>
  
<!--  <xsl:template match="properties">
    <map-properties xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()|@*"/>
    </map-properties>
  </xsl:template>-->
  <xsl:template match="geometry">
    <map-geometry xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()|@*"/>
    </map-geometry>
  </xsl:template>
  <xsl:template match="multipolygon">
    <map-multipolygon xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()|@*"/>
    </map-multipolygon>
  </xsl:template>
  <xsl:template match="polygon">
    <map-polygon xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()|@*"/>
    </map-polygon>
  </xsl:template>
  <xsl:template match="coordinates">
    <map-coordinates xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()"/>
    </map-coordinates>
  </xsl:template>
  <xsl:template match="linestring">
    <map-linestring xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()|@*"/>
    </map-linestring>
  </xsl:template>
  <xsl:template match="multilinestring">
    <map-multilinestring xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()|@*"/>
    </map-multilinestring>
  </xsl:template>
  <xsl:template match="multipoint">
    <map-multipoint xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()|@*"/>
    </map-multipoint>
  </xsl:template>
  <xsl:template match="point">
    <map-point xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()|@*"/>
    </map-point>
  </xsl:template>
  <xsl:template match="span">
    <map-span xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()|@*"/>
    </map-span>
  </xsl:template>
  <xsl:template match="map-a">
    <map-a xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()|@*"/>
    </map-a>
  </xsl:template>
<!--  <xsl:template match="base">
    <map-base xmlns="http://www.w3.org/1999/xhtml">
      <xsl:apply-templates select="node()|@*"/>
    </map-base>
  </xsl:template>-->
  <xsl:template match="base"/>
</xsl:stylesheet>
