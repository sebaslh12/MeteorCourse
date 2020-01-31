import { Meteor } from 'meteor/meteor';
import expect from 'expect';

import { Notes } from './notes';

if (Meteor.isServer) {
	describe('notes', function () {
		const noteOne = {
			_id: 'testNoteId1',
			title: 'My title',
			body: 'My body',
			updatedAt: 0,
			userId: 'testUserId1'
		};

		beforeEach(function () {
			Notes.remove({});
			Notes.insert(noteOne);
		})

		it('should insert new note', function () {
			const userId = 'testid';
			const _id = Meteor.server.method_handlers['notes.insert'].apply({ userId });
			expect(Notes.findOne({ _id, userId })).toBeTruthy();
		});

		it('should not insert if not authenticated note', function () {
			expect(() => {
				Meteor.server.method_handlers['notes.insert']();
			}).toThrow();
		});

		it('should remove note', function () {
			Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, [noteOne._id]);
			expect(Notes.findOne({ _id: noteOne._id })).toBeFalsy();
		});

		it('should not remove note if unauthenticated', function () {
			expect(() => {
				Meteor.server.method_handlers['notes.remove'].apply({}, [noteOne._id]);
			}).toThrow();
		});

		it('should not remove note if invalid _id', function () {
			expect(() => {
				Meteor.server.method_handlers['notes.remove'].apply({ userId: noteOne.userId }, []);
			}).toThrow();
		});

		it('should update note', function () {
			const title = 'this is a new title';
			Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, [noteOne._id, { title }]);
			const updatedNote = Notes.findOne({ _id: noteOne._id });
			expect(updatedNote.updatedAt).toBeGreaterThan(noteOne.updatedAt);
			expect(updatedNote).toMatchObject({
				title,
				body: noteOne.body
			});
		});

		it('should throw error if extra updates provided', function () {
			expect(() => {
				const title = 'this is a new title';
				Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, [noteOne._id, { title, name: 'Sebas' }]);
				const updatedNote = Notes.findOne({ _id: noteOne._id });
			}).toThrow();
		});

		it('it should not update note if user was not creator', function () {
			const title = 'this is a new title';
			Meteor.server.method_handlers['notes.update'].apply({ userId: 'nonExistantUser' }, [noteOne._id, { title }]);
			const updatedNote = Notes.findOne({ _id: noteOne._id });
			expect(updatedNote).toMatchObject(noteOne);
		});

		it('should not update note if unauthenticated', function () {
			expect(() => {
				Meteor.server.method_handlers['notes.update'].apply({}, [noteOne._id]);
			}).toThrow();
		});

		it('should not update note if invalid _id', function () {
			expect(() => {
				Meteor.server.method_handlers['notes.update'].apply({ userId: noteOne.userId }, []);
			}).toThrow();
		});
	});
}
