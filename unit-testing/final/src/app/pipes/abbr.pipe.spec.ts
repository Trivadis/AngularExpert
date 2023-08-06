import { TestBed, inject } from '@angular/core/testing';
import { AbbrPipe } from './abbr.pipe';

describe('AbbrPipe', () => {
  it('create an instance', () => {
    const pipe = new AbbrPipe();
    expect(pipe).toBeTruthy();
  });
});

describe('Pipe: AbbrPipe', () => {
  let pipe!: AbbrPipe;

  //setup
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [AbbrPipe],
    })
  );

  beforeEach(inject([AbbrPipe], (p: AbbrPipe) => {
    pipe = p;
  }));

  //specs
  it('should return null if an empty string is passed', () => {
    expect(pipe.transform('')).toEqual(null);
  });

  it('should work correctly with two names', () => {
    expect(pipe.transform('Thomas Gassmann')).toEqual('TG');
  });

  it('should work correctly with three names', () => {
    expect(pipe.transform('Thomas Müller Gassmann')).toEqual('TMG');
  });

  it('should throw with invalid values', () => {
    //must use arrow function for expect to capture exception
    expect(() => pipe.transform(undefined as any)).toThrow();
    expect(() => pipe.transform(null as any)).toThrowError(
      'Value is not a string'
    );
  });
});
