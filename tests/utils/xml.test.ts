import { describe, it, expect } from 'vitest';
import {
  buildTradingRequest,
  parseTradingResponse,
  parseXml,
  buildXml,
  wrapCDATA,
  EBAY_NAMESPACE,
} from '../../src/utils/xml.js';

describe('xml utilities', () => {
  describe('EBAY_NAMESPACE', () => {
    it('has correct namespace value', () => {
      expect(EBAY_NAMESPACE).toBe('urn:ebay:apis:eBLBaseComponents');
    });
  });

  describe('buildTradingRequest', () => {
    it('creates valid XML with declaration', () => {
      const xml = buildTradingRequest('GetTokenStatus', 'test-token');
      expect(xml).toMatch(/^\<\?xml version="1\.0" encoding="utf-8"\?\>/);
    });

    it('includes correct request element name', () => {
      const xml = buildTradingRequest('GetTokenStatus', 'test-token');
      expect(xml).toContain('<GetTokenStatusRequest');
    });

    it('includes eBay namespace', () => {
      const xml = buildTradingRequest('GetTokenStatus', 'test-token');
      expect(xml).toContain(`xmlns="${EBAY_NAMESPACE}"`);
    });

    it('includes RequesterCredentials with auth token', () => {
      const xml = buildTradingRequest('GetTokenStatus', 'my-auth-token');
      expect(xml).toContain('<RequesterCredentials>');
      expect(xml).toContain('<eBayAuthToken>my-auth-token</eBayAuthToken>');
    });

    it('includes additional parameters', () => {
      const xml = buildTradingRequest('GetItem', 'token', {
        ItemID: '123456789',
        DetailLevel: 'ReturnAll',
      });
      expect(xml).toContain('<ItemID>123456789</ItemID>');
      expect(xml).toContain('<DetailLevel>ReturnAll</DetailLevel>');
    });

    it('handles nested parameters', () => {
      const xml = buildTradingRequest('AddItem', 'token', {
        Item: {
          Title: 'Test Item',
          StartPrice: '9.99',
        },
      });
      expect(xml).toContain('<Item>');
      expect(xml).toContain('<Title>Test Item</Title>');
      expect(xml).toContain('<StartPrice>9.99</StartPrice>');
    });

    it('handles different operation names', () => {
      const operations = ['AddItem', 'ReviseItem', 'EndItem', 'GetItem'];
      for (const op of operations) {
        const xml = buildTradingRequest(op, 'token');
        expect(xml).toContain(`<${op}Request`);
      }
    });

    it('handles empty params object', () => {
      const xml = buildTradingRequest('GetTokenStatus', 'token', {});
      expect(xml).toContain('<GetTokenStatusRequest');
      expect(xml).toContain('</GetTokenStatusRequest>');
    });
  });

  describe('parseTradingResponse', () => {
    it('parses valid response', () => {
      const xml = `<?xml version="1.0"?>
        <GetTokenStatusResponse xmlns="urn:ebay:apis:eBLBaseComponents">
          <Ack>Success</Ack>
          <TokenStatus>Active</TokenStatus>
        </GetTokenStatusResponse>`;

      const result = parseTradingResponse<{ Ack: string; TokenStatus: string }>(
        xml,
        'GetTokenStatus'
      );
      expect(result.Ack).toBe('Success');
      expect(result.TokenStatus).toBe('Active');
    });

    it('throws on missing response key', () => {
      const xml = `<?xml version="1.0"?>
        <WrongResponse>
          <Ack>Success</Ack>
        </WrongResponse>`;

      expect(() => parseTradingResponse(xml, 'GetTokenStatus')).toThrow(
        'Invalid response: missing GetTokenStatusResponse'
      );
    });

    it('strips namespace prefix', () => {
      const xml = `<?xml version="1.0"?>
        <ns:GetItemResponse xmlns:ns="urn:ebay:apis:eBLBaseComponents">
          <ns:Ack>Success</ns:Ack>
        </ns:GetItemResponse>`;

      const result = parseTradingResponse<{ Ack: string }>(xml, 'GetItem');
      expect(result.Ack).toBe('Success');
    });

    it('parses nested elements', () => {
      const xml = `<?xml version="1.0"?>
        <GetItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
          <Ack>Success</Ack>
          <Item>
            <ItemID>123</ItemID>
            <Title>Test</Title>
          </Item>
        </GetItemResponse>`;

      const result = parseTradingResponse<{
        Ack: string;
        Item: Array<{ ItemID: string; Title: string }>;
      }>(xml, 'GetItem');
      expect(result.Item[0].ItemID).toBe('123');
      expect(result.Item[0].Title).toBe('Test');
    });

    it('keeps values as strings (no number parsing)', () => {
      const xml = `<?xml version="1.0"?>
        <GetItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
          <Ack>Success</Ack>
          <ItemID>123456789012</ItemID>
          <Price>9.99</Price>
        </GetItemResponse>`;

      const result = parseTradingResponse<{
        ItemID: string;
        Price: string;
      }>(xml, 'GetItem');
      expect(typeof result.ItemID).toBe('string');
      expect(typeof result.Price).toBe('string');
    });

    it('handles Errors as array', () => {
      const xml = `<?xml version="1.0"?>
        <AddItemResponse xmlns="urn:ebay:apis:eBLBaseComponents">
          <Ack>Failure</Ack>
          <Errors>
            <ErrorCode>123</ErrorCode>
            <ShortMessage>Error 1</ShortMessage>
          </Errors>
        </AddItemResponse>`;

      const result = parseTradingResponse<{
        Errors: Array<{ ErrorCode: string }>;
      }>(xml, 'AddItem');
      expect(Array.isArray(result.Errors)).toBe(true);
    });
  });

  describe('parseXml', () => {
    it('parses simple XML', () => {
      const xml = '<root><child>value</child></root>';
      const result = parseXml<{ root: { child: string } }>(xml);
      expect(result.root.child).toBe('value');
    });

    it('handles attributes', () => {
      const xml = '<item id="123">content</item>';
      const result = parseXml<{ item: { '@_id': string; '#text': string } }>(xml);
      expect(result.item['@_id']).toBe('123');
    });

    it('handles multiple elements as array', () => {
      const xml = `
        <root>
          <item>one</item>
          <item>two</item>
        </root>`;
      const result = parseXml<{ root: { item: string[] } }>(xml);
      // Multiple elements with same name become array
      expect(Array.isArray(result.root.item)).toBe(true);
      expect(result.root.item).toEqual(['one', 'two']);
    });
  });

  describe('buildXml', () => {
    it('builds simple XML', () => {
      const obj = { root: { child: 'value' } };
      const xml = buildXml(obj);
      expect(xml).toContain('<root>');
      expect(xml).toContain('<child>value</child>');
    });

    it('handles nested objects', () => {
      const obj = {
        parent: {
          child: {
            grandchild: 'value',
          },
        },
      };
      const xml = buildXml(obj);
      expect(xml).toContain('<grandchild>value</grandchild>');
    });

    it('handles attributes with @_ prefix', () => {
      const obj = {
        item: {
          '@_id': '123',
          '#text': 'content',
        },
      };
      const xml = buildXml(obj);
      expect(xml).toContain('id="123"');
    });

    it('suppresses empty nodes', () => {
      const obj = { root: { empty: '', filled: 'value' } };
      const xml = buildXml(obj);
      expect(xml).toContain('<filled>value</filled>');
      // Empty nodes should be suppressed
      expect(xml).not.toContain('<empty></empty>');
    });
  });

  describe('wrapCDATA', () => {
    it('wraps content in CDATA', () => {
      const result = wrapCDATA('Hello World');
      expect(result).toBe('<![CDATA[Hello World]]>');
    });

    it('handles HTML content', () => {
      const html = '<p>This is <b>bold</b> text</p>';
      const result = wrapCDATA(html);
      expect(result).toBe('<![CDATA[<p>This is <b>bold</b> text</p>]]>');
    });

    it('handles special characters', () => {
      const content = 'Price: £10 & discount < 50%';
      const result = wrapCDATA(content);
      expect(result).toContain('£10');
      expect(result).toContain('&');
      expect(result).toContain('<');
    });

    it('handles empty string', () => {
      const result = wrapCDATA('');
      expect(result).toBe('<![CDATA[]]>');
    });

    it('handles multiline content', () => {
      const content = 'Line 1\nLine 2\nLine 3';
      const result = wrapCDATA(content);
      expect(result).toContain('\n');
      expect(result).toBe('<![CDATA[Line 1\nLine 2\nLine 3]]>');
    });
  });
});
