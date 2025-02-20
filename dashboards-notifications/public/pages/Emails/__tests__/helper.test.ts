/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  createRecipientGroupConfigObject,
  createSenderConfigObject,
  onComboBoxCreateOption,
} from '../utils/helper';

describe('creates sender and recipient groups as config object', () => {
  it('creates sender config object', () => {
    const config = createSenderConfigObject(
      'sender',
      'test.com',
      '23',
      'start_tls',
      'sender@email.com'
    );
    expect(config).toEqual({
      name: 'sender',
      config_type: 'smtp_account',
      feature_list: ['alerting', 'index_management', 'reports'],
      is_enabled: true,
      smtp_account: {
        host: 'test.com',
        port: '23',
        method: 'start_tls',
        from_address: 'sender@email.com',
      },
    });
  });

  it('creates recipient group config object', () => {
    const config = createRecipientGroupConfigObject(
      'recipient group',
      'test description',
      [
        {
          label: 'email1@test.com',
        },
        {
          label: 'email2@test.com',
        },
        {
          label: 'email3@test.com',
        },
      ]
    );
    expect(config).toEqual({
      name: 'recipient group',
      config_type: 'email_group',
      description: 'test description',
      feature_list: ['alerting', 'index_management', 'reports'],
      is_enabled: true,
      email_group: {
        recipient_list: [
          { recipient: 'email1@test.com' },
          { recipient: 'email2@test.com' },
          { recipient: 'email3@test.com' },
        ],
      },
    });
  });
});

describe('handles combo box create option', () => {
  it('adds new option to combo box options', () => {
    const options = [
      { label: 'selected-option' },
      { label: 'existing-option' },
    ];
    const selectedOptions = [options[0]];
    const setOptions = jest.fn();
    const setSelectedOptions = jest.fn();
    const setInputError = jest.fn();
    onComboBoxCreateOption(
      'new-option',
      options,
      options,
      setOptions,
      selectedOptions,
      setSelectedOptions,
      setInputError
    );
    expect(setOptions).toBeCalledWith([...options, { label: 'new-option' }]);
    expect(setSelectedOptions).toBeCalledWith([
      ...selectedOptions,
      { label: 'new-option' },
    ]);
  });

  it('selects existing option', () => {
    const options = [
      { label: 'selected-option' },
      { label: 'existing-option' },
    ];
    const selectedOptions = [options[0]];
    const setOptions = jest.fn();
    const setSelectedOptions = jest.fn();
    const setInputError = jest.fn();
    onComboBoxCreateOption(
      'existing-option',
      options,
      options,
      setOptions,
      selectedOptions,
      setSelectedOptions,
      setInputError
    );
    expect(setOptions).not.toBeCalled();
    expect(setSelectedOptions).toBeCalledWith([
      ...selectedOptions,
      { label: 'existing-option' },
    ]);
  });
});
