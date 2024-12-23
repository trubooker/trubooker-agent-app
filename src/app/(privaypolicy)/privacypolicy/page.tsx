"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import Goback from "@/components/Goback";
import { IoChevronBackOutline } from "react-icons/io5";

const TermsAndConditions = () => {
  const router = useRouter();
  // const handleAgreement = async () => {
  //   const formdata = {
  //     terms: true,
  //   };
  //   try {
  //     const response = await axios.post(
  //       `${process.env.NEXT_PUBLIC_API_URL}/agent/i-agree`,
  //       formdata
  //     );

  //     if (response.status === 200) {
  //       router.push("/register");
  //     }
  //   } catch {}
  // };

  return (
    // <div className="bg-white text-gray-900 w-10/12 mx-auto">
    <div className="m-5">
      <button
        onClick={router.back}
        className="text-gray-500 top-7 left-8 lg:top-2 lg:left-2 z-20 bg-white h-10 w-10 flex items-center justify-center"
      >
        <IoChevronBackOutline className="h-6 w-6 text-gray-800" />
      </button>
      <div className="max-w-6xl lg:text-justify bg-white text-gray-900 mx-auto px-5 py-5">
        {/* Title Section */}
        <div className="text-left mb-8">
          <h1 className="text-2xl sm:text-4xl font-bold">
            TruBooker Connectors&apos; Agreement
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Last updated on April 2024
          </p>
        </div>

        {/* Section 1: Introduction */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
          <p className="mb-4">
            Welcome to TruBooker Connectors&apos; Referral System! These Terms
            of Use and Policies (&quot;Agreement&quot;) outline the legal
            relationship between TruBooker LTD and TruBooker Connectors. By
            registering as a TruBooker Connector, You agree to adhere to these
            terms and conditions. In an effort to onboard highly compliant and
            qualified Vehicles and Vehicle Operators, TruBooker provides the
            TruBooker Connectors&apos; Referral System. This system allows
            TruBooker Connectors to refer Vehicle Operators to market and sell
            transport services via the TruBooker Platform. The subsequent pages
            outline the specific details and requirements of the TruBooker
            Connectors&apos; Referral System.
          </p>
        </section>

        {/* Section 2: Definitions */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">2. Definitions</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>TruBooker Platform:</strong> The website and associated
              mobile applications (iOS and Android) used for booking
              transportation services, collectively referred to as
              &quot;TruBooker Platforms.&quot;
            </li>
            <li>
              <strong>TruBooker Connector(s):</strong> A person or entity that
              refers or recommends a Vehicle Operator(s) to TruBooker for
              participation in the platform. The TruBooker Connector is not an
              employee or agent of TruBooker and does not directly operate the
              vehicles but facilitates the connection between a Vehicle
              Operator(s) and TruBooker for trips marketed and sold by the
              TruBooker platform.
            </li>
            <li>
              <strong>Vehicle Operator:</strong> An independent driver/sailor
              who operates the Vehicle for trips marketed and sold by TruBooker.
              Vehicle Operators are not under any contract of employment with
              TruBooker. Vehicle Operators set their fares and may have their
              terms and conditions, which can differ from those of TruBooker.
              The Vehicle Operator is identified during the booking process, in
              the booking confirmation, and on the ticket.
            </li>
            <li>
              <strong>Passenger:</strong>an individual who travels on a Vehicle
              operated by a Vehicle Operator and holds a valid ticket purchased
              through TruBooker. Passengers must comply with the terms and
              conditions of the Passenger&apos;s ticket and are entitled to
              transportation between the designated points of origin and
              destination.
            </li>
            <li>
              <strong>Force Majeure:</strong>As used in these Terms, “force
              majeure” means actual, threatened or reported:
              <ol>
                <li>
                  Weather conditions or acts of God;
                  <li>
                    Riots, civil unrest, embargoes, war, hostilities, pandemic,
                    or unsettled international conditions;
                  </li>
                  <li>
                    Strikes, work stoppages, slowdowns, lockout, or any other
                    labor-related dispute;
                  </li>
                  <li>
                    Government regulation, demand, directive, or requirement;
                  </li>
                  <li>Shortages of labor, fuel, or facilities; or</li>
                  <li>
                    Any other condition beyond TruBooker&apos;s control or any
                    condition not reasonably foreseen
                  </li>
                  by TruBooker.
                </li>
              </ol>
            </li>
            <li>
              <strong>You/Your/Yourself:</strong> A TruBooker Connector and any
              entity that the TruBooker Connector represents.
            </li>
          </ul>
        </section>

        {/* Section 3: Acceptance of Terms */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">3. Acceptance of Terms</h2>
          <p className="mb-4">
            By becoming a TruBooker Connector, You agree to comply with this
            Agreement. If You do not agree with any part of this Agreement, You
            are not permitted to use the TruBooker Platform or act as a
            TruBooker Connector.
          </p>
          <p className="mb-4">
            By ticking the &quot;Read and Agreed&quot; box below, You hereby
            confirm that You have read and fully understood the terms and
            conditions outlined in this Agreement, including any rights,
            obligations, or liabilities that may arise from entering into this
            Agreement. You further acknowledge that You have had the opportunity
            to seek independent legal advice regarding the contents of this
            Agreement and that Your decision to agree to these terms is made
            freely and voluntarily.
          </p>
          <p className="mb-4">
            By ticking the &quot;Read and Agreed&quot; box, You agree that this
            action constitutes the electronic equivalent of Your signature, and
            is a binding acknowledgment that they accept and agree to all the
            terms, policies, and conditions of this Agreement. This electronic
            signature holds the same legal effect as a written signature under
            applicable laws and regulations. If You do not agree to any of the
            terms of this Agreement, You are not permitted to use the TruBooker
            Platform, You must refrain from ticking the box, and should not
            proceed with registration or participation in the TruBooker
            Connectors. Referral System.
          </p>
        </section>

        {/* Sections (4) */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            4. Modification of Terms
          </h2>
          <p className="mb-4">
            TruBooker reserves the right to amend this Agreement at any time,
            with or without prior notice. Any changes may be communicated
            through the TruBooker Platform by push notification. Changes will be
            effective upon posting updated terms on the TruBooker platform and
            continued participation after such changes constitutes acceptance of
            the revised terms.
          </p>
        </section>

        {/* Sections (5) */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            5. User Responsibilities and Eligibility
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Eligibility:</strong> You must be at least 18 years old to
              qualify as a TruBooker Connector.
            </li>
            <li>
              <strong>Accuracy of Information:</strong> You are responsible for
              ensuring that all information provided is accurate and up to date.
            </li>
            <li>
              <strong>Legal Compliance:</strong> You must comply and ensure
              Vehicle Operators referred by You comply with all applicable laws,
              including vehicle operation, insurance, and licensing
              requirements.
            </li>
          </ul>
        </section>

        {/* Section 6 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            6. Role and Responsibilities of a TruBooker Connector(s)
          </h2>
          <p className="mb-2">
            As a TruBooker Connector, Your responsibilities include:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>6.1. Identifying Qualified Vehicle Operators:</strong>{" "}
              Referring only Vehicle Operators who meet TruBooker&apos;s
              requirements, including age, licensing, and vehicle compliance
              standards.
            </li>
            <li>
              <strong>6.2. Ensuring Compliance:</strong> Assisting referred
              Vehicle operators with background checks, insurance verifications,
              and any other compliance requirements.
            </li>
            <li>
              <strong>6.3. Onboarding Support:</strong> Helping Vehicle
              Operators complete the onboarding process.
            </li>
            <li>
              <strong>6.4. Post-Referral Engagement:</strong> Providing ongoing
              support to ensure Vehicle Operators can manage bookings
              effectively.
            </li>
            <li>
              <strong>6.5. Non-Interference:</strong> You must not interfere
              with any agreements between TruBooker and the Vehicle Operator
              after the referral is made.
            </li>
            <li>
              <strong>6.6. Terms of Use and Privacy Policy:</strong> You must
              make sure to get the Vehicle Operators aware of, understand, and
              agree to the TruBooker Terms of Use and the TruBooker Privacy
              Policy.
            </li>
          </ul>
        </section>

        {/* Section 7 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            7. Vehicle-Specific Requirements/Vehicle Operator Responsibilities
            and Eligibility
          </h2>
          <p className="mb-2">
            A Vehicle Operator referred by You is expected to comply with the
            following requirements:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>7.1.</strong> For a 9-seater bus or smaller vehicles, the
              Vehicle Operator must be at least 18 years old and possess the
              required commercial driving license.
            </li>
            <li>
              <strong>7.2.</strong> For buses larger than 9 seats, the Vehicle
              Operator must be at least 21 years old and possess the required
              commercial driving license.
            </li>
            <li>
              <strong>7.3. Licensing and Documentation:</strong> Vehicle
              Operators must hold valid vehicle licenses, including any
              commercial driving permits required for operating larger vehicles
              or multiple passenger buses.
            </li>
            <li>
              <strong>7.4. Insurance Coverage:</strong> All vehicles must be
              insured in compliance with applicable local laws. This insurance
              must cover both the vehicle and passengers in case of accidents or
              incidents.
            </li>
            <li>
              <strong>7.5. Compliance with Safety Regulations:</strong> Vehicle
              Operators must adhere to all safety and operational regulations,
              including vehicle maintenance and regular safety checks.
            </li>
            <li>
              <strong>7.6. Onboarding Process:</strong> Complete all necessary
              onboarding steps, including submitting valid identification,
              insurance certificates, and vehicle registration documents.
            </li>
            <li>
              <strong>7.7. Trip Management:</strong> Vehicle Operators are
              responsible for managing their bookings, ensuring timely arrival,
              and providing safe and professional transportation services to
              Passengers.
            </li>
            <li>
              <strong>7.8. Independent Solicitations:</strong> Vehicle Operators
              may negotiate bookings outside the TruBooker Platform.
            </li>
          </ul>
        </section>

        {/* Section 8 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            8. Referral and Reward Structure
          </h2>
          <p className="mb-2">
            While TruBooker values the contributions of TruBooker Connectors and
            is committed to fostering a supportive environment, the following
            Referral reward structure will apply:
          </p>
          <p className="mb-2">
            For each successful onboarding of a Vehicle Operator, TruBooker
            Connectors will earn N200 (Two Hundred Naira) for every trip
            marketed and sold by the Vehicle Operator via the TruBooker
            platform. The total referral reward for any Vehicle Operator shall
            not exceed 1000 naira, regardless of the number of trips. Payments
            will be credited incrementally as the Vehicle Operator completes
            trips, and the minimum withdrawal threshold is N1000 (One Thousand
            Naira).
          </p>
          <p className="mb-2">
            Referral rewards are intended for the original recipient and cannot
            be transferred, sold, or reassigned to another party under any
            circumstances.
          </p>
        </section>

        {/* Section 9 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">9. Limit on Referrals</h2>
          <p className="mb-2">
            Each TruBooker Connector may refer an unlimited number of Vehicles
            and Vehicle Operators. However, TruBooker reserves the right to
            verify all referrals and determine, at its sole discretion, whether
            they meet the TruBooker criteria. Only verified and approved
            referrals will be eligible for rewards, if any. TruBooker also
            reserves the right to modify, suspend, or terminate the TruBooker
            Connector Referral system at any time without prior notice.
          </p>
        </section>

        {/* Section 10 */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            10. Termination/Disqualification
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>10.1.</strong> TruBooker reserves the right to terminate
              Your status/disqualify You as a TruBooker Connector or Vehicle
              Operator at any time if:
              <ul className="list-inside ml-10 space-y-2">
                <li>
                  <strong>10.1.1.</strong> You do not comply with the terms of
                  this Policy,
                </li>
                <li>
                  <strong>10.1.2.</strong> You act in bad faith, or
                </li>
                <li>
                  <strong>10.1.3.</strong> You violate any applicable laws or
                  agreements.
                </li>
              </ul>
            </li>
            <li>
              <strong>10.2.</strong> Upon termination/disqualification, any
              pending Referral rewards, if any, will be forfeited.
            </li>
          </ul>
        </section>
        {/* <Button
      onClick={handleAgreement}
      className="w-full h-12 mt-8 rounded-xl text-white bg-[--primary] hover:bg-[--primary-hover]"
    >
      I agree
    </Button> */}
      </div>
    </div>
  );
};

export default TermsAndConditions;
