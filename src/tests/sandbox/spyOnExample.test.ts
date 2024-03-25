function getLatest(index = messages.items.length - 1) {
  return messages.items[index]
}

const messages = {
  items: [
    { message: 'Simple test message', from: 'Testman' },
  ],
  getLatest, // can also be a `getter or setter if supported`
}

describe('reading messages', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should get the latest message with a spy', () => {
    const itemForSpy = { message: 'Elo', from: 'Joł' };

    const spy = vi.spyOn(messages, 'getLatest')
    spy.mockImplementationOnce(() => itemForSpy);
    expect(messages.getLatest()).toEqual(itemForSpy);
  })
});

export {}