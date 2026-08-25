-- Bain Capital first project. Run after schema in Supabase SQL editor.
delete from projects where id = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';

insert into projects (id, name, client_name, address)
values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Bain Capital', 'Bain Capital', 'Suite 28.01 & 28.02, Aurora Place 88 Phillip Street, Sydney 2000');

insert into team_members (project_id, name, role, phone, email, responsibilities, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Kat McMahon', 'Strategy Director', '0411 760 246', 'kat@made-for.com.au', 'Champions the project internally.
Ensures strategic alignment with business goals and global workplace standards.
Provides guidance, support, and escalation pathways for critical decisions.
Safeguards quality and outcomes without managing daily tasks.
Sits in on key client meetings, fact finds and presentations.', 0);
insert into team_members (project_id, name, role, phone, email, responsibilities, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Chris Free', 'Design Director', '0488 327 815', 'chris@made-for.com.au', 'Drives the overarching design strategy from briefing to delivery including client presentations.
Leads all consultant coordination and ensures design alignment.
Provides quality control across all drawing packages.
Balances big-picture vision with detailed technical resolution.
Ensures consistency of design narrative throughout the project.', 1);
insert into team_members (project_id, name, role, phone, email, responsibilities, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Sophie Woods', 'Interior Designer', '', '', 'Develops design documentation across all phases of the project.
Selects materials, finishes, and furniture aligned with the design narrative.
Produces drawings, mood boards, and presentation materials.
Supports coordination with suppliers and consultants.
Ensures detailing reflects both creative intent and practical needs.', 2);
insert into team_members (project_id, name, role, phone, email, responsibilities, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Lara Pillot', 'Associate Director', '', '', 'Leads the client side PM role on site in collaboration with the strategy lead.
Runs tender process with select tenderers.
Reviews cost proposals and issues value management solutions through tender stage.
Coordinates PCG meetings with on site team.
Manages CDC application and landlord communication.
Issues and coordinates As Built drawings.
Coordinates 30, 90 and 365 day check ins.
Issues client weekly wrap emails and communications.', 3);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0000-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '03 Aug 2025', 'Mobilisation and onboarding of Made For team.
High-level strategy session with Kat McMahon and client stakeholders.
Site measure and review of building fitout guide for Suite 28.02.
Initial test fit review and planning principles workshop.', 'Commence concept design phase.
First weekly design workshop with Bain Capital team.
Define design drivers and explore materiality direction.
Begin 3D test fit development.', 'Programme tracking on schedule. Target FDOB February 2027 remains achievable.', 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0000-4000-8000-000000000001', 'Confirm Bain Capital key stakeholder contacts and decision makers.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0000-4000-8000-000000000001', 'Obtain existing as-built drawings for Suite 28.01 from landlord.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0000-4000-8000-000000000001', 'Confirm headcount targets for expansion space.', false, 2);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0000-4000-8000-000000000001', 'Receive building fitout guide from Aurora Place management.', false, 3);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0001-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '10 Aug 2025', 'Concept design workshop with Bain Capital stakeholders.
Design drivers and materiality direction presented.
3D test fit development commenced.
Review of headcount and adjacency requirements.', 'Develop initial concept design options.
Prepare mood boards and materiality palette.
Continue 3D modelling of test fit scenarios.
Review planning principles with client.', 'Concept design phase underway. Programme on track.', 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0001-4000-8000-000000000001', 'Confirm headcount targets for expansion space.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0001-4000-8000-000000000001', 'Receive building fitout guide from Aurora Place management.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0001-4000-8000-000000000001', 'Obtain base building services drawings from landlord.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0002-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '17 Aug 2025', 'Concept design options developed and presented.
Mood boards and materiality palette reviewed with client.
3D test fit scenarios reviewed and refined.
Planning principles confirmed.', 'Refine preferred concept design option.
Develop detailed floor plan based on feedback.
Commence space planning for all work zones.
Prepare concept design report.', 'Concept design progressing well. Client feedback incorporated.', 2);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0002-4000-8000-000000000001', 'Receive building fitout guide from Aurora Place management.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0002-4000-8000-000000000001', 'Obtain base building services drawings from landlord.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0002-4000-8000-000000000001', 'Client sign-off on preferred concept direction.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0003-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '24 Aug 2025', 'Preferred concept design option refined.
Detailed floor plan developed based on client feedback.
Space planning for all work zones commenced.
Concept design report drafted.', 'Finalise concept design for client approval.
Prepare concept design presentation.
Issue concept design package for review.
Schedule concept approval meeting.', 'Approaching concept approval milestone. On programme.', 3);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0003-4000-8000-000000000001', 'Obtain base building services drawings from landlord.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0003-4000-8000-000000000001', 'Client sign-off on preferred concept direction.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0003-4000-8000-000000000001', 'Confirm FF&E budget allocation.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0004-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '31 Aug 2025', 'Concept design package issued for client review.
Concept design presentation delivered to Bain Capital leadership.
Concept approval received — milestone achieved.
Design development phase commenced.', 'Begin design development drawings.
Engage structural and services engineers.
Commence FF&E research and procurement schedule.
Develop detailed reflected ceiling plan.', 'Concept approval milestone achieved. Design development underway.', 4);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0004-4000-8000-000000000001', 'Confirm FF&E budget allocation.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0004-4000-8000-000000000001', 'Appoint structural engineer.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0004-4000-8000-000000000001', 'Appoint mechanical and electrical engineer.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0005-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '07 Sep 2025', 'Design development drawings commenced.
Structural and services engineers engaged.
FF&E research and procurement schedule commenced.
Reflected ceiling plan development started.', 'Progress design development documentation.
Coordinate with structural engineer on slab penetrations.
Develop joinery and partition schedules.
Review services coordination requirements.', 'Design development on track. Consultant coordination progressing.', 5);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0005-4000-8000-000000000001', 'Appoint mechanical and electrical engineer.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0005-4000-8000-000000000001', 'Confirm joinery specification approach.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0005-4000-8000-000000000001', 'Receive structural engineer preliminary advice.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0006-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '14 Sep 2025', 'Design development documentation progressing.
Structural coordination meeting held.
Joinery and partition schedules under development.
Services coordination requirements reviewed.', 'Progress DD drawings across all disciplines.
Develop detailed FF&E schedule.
Commence finishes schedule.
Review structural advice and incorporate into drawings.', 'Design development progressing across all disciplines.', 6);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0006-4000-8000-000000000001', 'Confirm joinery specification approach.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0006-4000-8000-000000000001', 'Receive structural engineer preliminary advice.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0006-4000-8000-000000000001', 'Client review of DD progress drawings.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0007-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '21 Sep 2025', 'DD drawings progressing across all disciplines.
Detailed FF&E schedule drafted.
Finishes schedule commenced.
Structural advice received and incorporated.', 'Issue DD progress set to client for review.
Develop door and hardware schedule.
Coordinate services layouts with engineers.
Prepare design sign-off presentation.', 'DD midpoint reached. Client review scheduled.', 7);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0007-4000-8000-000000000001', 'Client review of DD progress drawings.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0007-4000-8000-000000000001', 'Confirm door and hardware specification.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0007-4000-8000-000000000001', 'Services coordination drawings from engineers.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0008-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '28 Sep 2025', 'DD progress set issued to client for review.
Door and hardware schedule developed.
Services layouts coordinated with engineers.
Design sign-off presentation prepared.', 'Incorporate client feedback on DD drawings.
Finalise all schedules for design sign-off.
Issue final DD package for approval.
Schedule design sign-off meeting.', 'Approaching design sign-off milestone.', 8);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0008-4000-8000-000000000001', 'Confirm door and hardware specification.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0008-4000-8000-000000000001', 'Client sign-off on DD package.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0008-4000-8000-000000000001', 'Finalise finishes schedule.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0009-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '05 Oct 2025', 'Client feedback on DD drawings incorporated.
All schedules finalised for design sign-off.
Final DD package issued for approval.
Design sign-off achieved — milestone reached.', 'Commence tender documentation phase.
Prepare tender drawings package.
Develop specification sections.
Engage quantity surveyor for cost plan update.', 'Design sign-off milestone achieved. Tender documentation commenced.', 9);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0009-4000-8000-000000000001', 'Appoint quantity surveyor.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0009-4000-8000-000000000001', 'Confirm tender strategy with client.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0009-4000-8000-000000000001', 'Prepare list of invited tenderers.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0010-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '12 Oct 2025', 'Tender documentation commenced.
Tender drawings package in progress.
Specification sections being developed.
QS engaged for cost plan update.', 'Progress tender drawings across all trades.
Develop general and particular conditions of contract.
Coordinate with engineers on tender spec sections.
Issue preliminary cost plan.', 'Tender documentation phase underway. QS coordinating.', 10);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0010-4000-8000-000000000001', 'Confirm list of invited tenderers.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0010-4000-8000-000000000001', 'Receive preliminary QS cost plan.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0010-4000-8000-000000000001', 'Confirm contract form and conditions.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0011-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '19 Oct 2025', 'Tender drawings progressing across all trades.
General and particular conditions of contract developed.
Engineer spec sections coordinated.
Preliminary cost plan received from QS.', 'Finalise tender drawings and specifications.
Prepare tender bill of quantities.
Issue tender package for internal review.
Confirm tenderer shortlist.', 'Tender documentation on track for issue.', 11);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0011-4000-8000-000000000001', 'Confirm list of invited tenderers.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0011-4000-8000-000000000001', 'Internal review of tender package.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0011-4000-8000-000000000001', 'Final QS review of tender documents.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0012-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '26 Oct 2025', 'Tender drawings and specifications finalised.
Tender bill of quantities prepared.
Tender package issued for internal review.
Tenderer shortlist confirmed.', 'Issue tender package to shortlisted contractors.
Conduct pre-tender briefing on site.
Manage tenderer queries.
Progress page turn preparation.', 'Tender package ready for issue. Page turn scheduled.', 12);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0012-4000-8000-000000000001', 'Issue tender package to contractors.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0012-4000-8000-000000000001', 'Conduct pre-tender site briefing.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0012-4000-8000-000000000001', 'Page turn meeting with Bain Capital.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0013-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '02 Nov 2025', 'Tender package issued to shortlisted contractors.
Pre-tender briefing conducted on site.
Page turn meeting held with Bain Capital — milestone achieved.
Tender issue for tender milestone achieved.', 'Manage contractor queries during tender period.
Issue addenda as required.
Monitor tender programme.
Commence value management review.', 'Tender period underway. Page turn and issue for tender milestones achieved.', 13);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0013-4000-8000-000000000001', 'Respond to contractor tender queries.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0013-4000-8000-000000000001', 'Issue addendum 1 if required.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0013-4000-8000-000000000001', 'Value management options under review.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0014-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '09 Nov 2025', 'Contractor queries managed and addenda issued.
Value management options reviewed with client.
Tender period monitoring ongoing.
Mid-tender check-in with shortlisted contractors.', 'Continue managing tender queries.
Prepare tender returns assessment framework.
Coordinate with QS on evaluation criteria.
Finalise value management recommendations.', 'Tender period progressing. Tender returns due shortly.', 14);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0014-4000-8000-000000000001', 'Issue addendum 2 if required.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0014-4000-8000-000000000001', 'Tender returns assessment framework prepared.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0014-4000-8000-000000000001', 'Value management sign-off from client.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0015-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '16 Nov 2025', 'Final tender queries managed.
Tender returns assessment framework prepared.
Value management recommendations finalised.
Tender returns received — milestone achieved.', 'Commence tender analysis and evaluation.
Interview shortlisted contractors.
Prepare tender report for client.
Make recommendation for award.', 'Tender returns milestone achieved. Evaluation underway.', 15);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0015-4000-8000-000000000001', 'Complete tender analysis.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0015-4000-8000-000000000001', 'Contractor interviews scheduled.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0015-4000-8000-000000000001', 'Tender report prepared.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0016-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '23 Nov 2025', 'Tender analysis and evaluation completed.
Shortlisted contractors interviewed.
Tender report prepared and issued to client.
Award recommendation made — GC award milestone achieved.', 'Execute contract with appointed contractor.
Mobilise contractor for site take-on.
Prepare site establishment requirements.
Issue construction drawings package.', 'Award GC milestone achieved. Construction phase commencing.', 16);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0016-4000-8000-000000000001', 'Execute head contract.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0016-4000-8000-000000000001', 'Contractor insurance and bonds confirmed.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0016-4000-8000-000000000001', 'Site establishment plan from contractor.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0017-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '30 Nov 2025', 'Head contract executed with appointed contractor.
Contractor mobilised — take on site milestone achieved.
Site establishment underway.
Construction drawings package issued.', 'Commence demolition and strip-out works.
Hold first site meeting.
Establish construction programme review cadence.
Commence weekly site inspections.', 'Take on site milestone achieved. Construction underway.', 17);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0017-4000-8000-000000000001', 'Contractor insurance and bonds confirmed.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0017-4000-8000-000000000001', 'First site meeting held.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0017-4000-8000-000000000001', 'Demolition programme reviewed.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0018-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '07 Dec 2025', 'Demolition and strip-out works commenced.
First site meeting held.
Construction programme reviewed.
Weekly site inspection regime established.', 'Progress demolition works.
Review structural works programme.
Coordinate early procurement of long-lead items.
Issue site instruction register.', 'Construction phase progressing. Demolition underway.', 18);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0018-4000-8000-000000000001', 'Long-lead items procurement confirmed.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0018-4000-8000-000000000001', 'Structural works programme reviewed.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0018-4000-8000-000000000001', 'Site instruction register issued.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0019-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '14 Dec 2025', 'Demolition works progressing on programme.
Structural works programme reviewed.
Long-lead items procurement confirmed.
Site instruction register issued.', 'Christmas shutdown commencing 21 Dec.
Site secure and made safe for shutdown period.
Resume site works 5 Jan 2026.
Programme review on return.', 'Construction progressing. Christmas shutdown from 21 Dec to 4 Jan.', 19);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0019-4000-8000-000000000001', 'Site secured for Christmas shutdown.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0019-4000-8000-000000000001', 'Programme review on return from shutdown.', false, 1);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0020-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '21 Dec 2025', 'Site secured and made safe for Christmas shutdown.
All trades signed off for holiday period.
Outstanding site instructions reviewed prior to shutdown.
Programme reviewed for return in January.', 'Christmas & New Year shutdown — site closed.
Resume works week commencing 5 Jan 2026.
Programme review meeting on return.
Issue updated construction programme.', 'Christmas shutdown period. Site resumes 5 Jan 2026.', 20);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0020-4000-8000-000000000001', 'Site secured for Christmas shutdown.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0020-4000-8000-000000000001', 'Programme update issued for January return.', false, 1);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0021-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '28 Dec 2025', 'Christmas & New Year shutdown period.
Site closed — no works on site.
Made For team on leave.
Resume week commencing 5 Jan 2026.', 'Resume construction works 5 Jan.
Site remobilisation and programme review.
Review progress against programme.
Issue updated programme to all parties.', 'Shutdown period. All parties resume 5 Jan 2026.', 21);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0021-4000-8000-000000000001', 'Programme update issued for January return.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0021-4000-8000-000000000001', 'Contractor remobilisation plan confirmed.', false, 1);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0022-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '04 Jan 2026', 'Construction works resumed post-shutdown.
Site remobilisation completed.
Programme review meeting held.
Updated construction programme issued.', 'Progress framing and partition works.
Commence rough-in services installation.
Review FF&E procurement status.
Coordinate joinery manufacture progress.', 'Works resumed post-shutdown. Programme monitoring underway.', 22);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0022-4000-8000-000000000001', 'Contractor remobilisation plan confirmed.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0022-4000-8000-000000000001', 'FF&E procurement status reviewed.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0022-4000-8000-000000000001', 'Joinery manufacture programme confirmed.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0023-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '11 Jan 2026', 'Framing and partition works progressing.
Rough-in services installation commenced.
FF&E procurement status reviewed.
Joinery manufacture programme confirmed.', 'Continue partition and ceiling works.
Progress mechanical and electrical rough-in.
Review joinery shop drawings.
Commence architectural finishes installation.', 'Construction progressing well post-shutdown. On programme.', 23);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0023-4000-8000-000000000001', 'Joinery shop drawings reviewed and approved.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0023-4000-8000-000000000001', 'Architectural finishes delivery dates confirmed.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0023-4000-8000-000000000001', 'Site progress photograph set updated.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0024-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '18 Jan 2026', 'Partition and ceiling works continuing.
Mechanical and electrical rough-in progressing.
Joinery shop drawings reviewed.
Architectural finishes installation commenced.', 'Complete rough-in works.
Begin fit-off of services.
Progress joinery installation.
Commence painting and floor preparation.', 'Construction in fit-out phase. Tracking to programme.', 24);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0024-4000-8000-000000000001', 'Architectural finishes delivery dates confirmed.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0024-4000-8000-000000000001', 'Defects inspection schedule prepared.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0024-4000-8000-000000000001', 'FF&E delivery and installation programme confirmed.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0025-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '25 Jan 2026', 'Rough-in works completed.
Services fit-off commenced.
Joinery installation progressing.
Painting and floor preparation underway.', 'Complete joinery installation.
Progress FF&E delivery and installation.
Conduct defects inspection.
Prepare practical completion checklist.', 'Fit-out nearing completion. Final trades on site.', 25);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0025-4000-8000-000000000001', 'FF&E delivery and installation programme confirmed.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0025-4000-8000-000000000001', 'Defects inspection scheduled.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0025-4000-8000-000000000001', 'Practical completion checklist issued.', false, 2);
insert into weeks (id, project_id, date_label, this_week, next_week, programme_note, sort_order) values ('a1b2c3d4-0026-4000-8000-000000000001', 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', '01 Feb 2026', 'Joinery installation completed.
FF&E delivered and installed.
Defects inspection conducted.
Practical completion checklist issued.', 'Defects rectification period.
Final client walkthrough and handover preparation.
Commissioning of all services.
FDOB — Fit-Out Date of Beneficial Occupancy achieved.', 'Approaching FDOB. Handover preparations underway. Target February 2026 remains on track.', 26);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0026-4000-8000-000000000001', 'All defects rectified prior to handover.', false, 0);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0026-4000-8000-000000000001', 'Services commissioning certificates received.', false, 1);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0026-4000-8000-000000000001', 'As-built drawings issued.', false, 2);
insert into outstanding_items (week_id, text, done, sort_order) values ('a1b2c3d4-0026-4000-8000-000000000001', 'O&M manuals issued.', false, 3);
insert into programme_phases (project_id, label, start_date, end_date, color, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'MOBILISE & STRATEGY', '2025-08-03', '2025-08-09', '#3F65D6', 0);
insert into programme_phases (project_id, label, start_date, end_date, color, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'CONCEPT DESIGN', '2025-08-10', '2025-09-06', '#A490DB', 1);
insert into programme_phases (project_id, label, start_date, end_date, color, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'DESIGN DEVELOPMENT', '2025-09-07', '2025-10-04', '#A490DB', 2);
insert into programme_phases (project_id, label, start_date, end_date, color, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'TENDER DOCUMENTATION', '2025-10-05', '2025-11-01', '#3F65D6', 3);
insert into programme_phases (project_id, label, start_date, end_date, color, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'TENDER & VALUE MANAGEMENT', '2025-11-02', '2025-11-29', '#3F65D6', 4);
insert into programme_phases (project_id, label, start_date, end_date, color, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'CONSTRUCTION & DELIVERY', '2025-11-30', '2026-02-07', '#299F3D', 5);
insert into programme_milestones (project_id, label, date, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Kick-off', '2025-08-03', 0);
insert into programme_milestones (project_id, label, date, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Concept Approval', '2025-08-31', 1);
insert into programme_milestones (project_id, label, date, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Design Sign-off', '2025-09-28', 2);
insert into programme_milestones (project_id, label, date, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Page Turn', '2025-10-26', 3);
insert into programme_milestones (project_id, label, date, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Issue for Tender', '2025-11-02', 4);
insert into programme_milestones (project_id, label, date, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Tender Returns', '2025-11-16', 5);
insert into programme_milestones (project_id, label, date, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Award GC', '2025-11-23', 6);
insert into programme_milestones (project_id, label, date, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'Take On Site', '2025-11-30', 7);
insert into programme_milestones (project_id, label, date, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'FDOB', '2026-02-01', 8);
insert into budget_lines (project_id, category, label, amount, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'construction', 'Expansion Space ($3,000 / SQM)', 438000, 0);
insert into budget_lines (project_id, category, label, amount, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'construction', 'Workspace ($1,500 / SQM)', 75000, 1);
insert into budget_lines (project_id, category, label, amount, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'consultants', 'MEP, Security Fire, Acoustics', 15000, 2);
insert into budget_lines (project_id, category, label, amount, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'consultants', 'Certifier / Associated Fees', 6500, 3);
insert into budget_lines (project_id, category, label, amount, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'consultants', 'Long Service Levy', 6725, 4);
insert into budget_lines (project_id, category, label, amount, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'fees', 'Made For Design Fee', 14875, 5);
insert into budget_lines (project_id, category, label, amount, sort_order) values ('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'fees', 'Made For Project Mgmt Fee', 19440, 6);
