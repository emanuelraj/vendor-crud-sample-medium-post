'use strict';

const ThreatScenario = require('../threatscenarios/threatscenarios.model');

module.exports = {
      index: (req, res) => {
        ThreatScenario
          .find({})
          .exec((err, threatScenarioDetails)=>{
               if (err) {
                   res.status(500).json({message : err})
               }
res.status(200).json({ message: "threat scenarioId Details fetched Successfully", data : threatScenarioDetails});
          })
      },
      retrieve: (req, res) => {
           const threatScenarioId = req.params.id;
           ThreatScenario
           .findOne({_id:threatScenarioId})
           .exec((err, threatScenarioDetails)=>{
                if (err) {
                    res.status(500).json({message : err})
                }
                
                res.status(200).json({ message: "threat scenarioId Details fetched Successfully", data : threatScenarioDetails});
           })
       },
       create: (req, res) => {
        ThreatScenario.create(req.body, (err, threatScenarioDetails) => {
                if (err) {
                     res.status(500).json({message : err})
                }
                res.status(201).json({ message: "threat scenarioId Created Successfully", data : threatScenarioDetails});
           })
       },
       update: (req, res)=>{
            const threatScenarioId = req.params.id;
            ThreatScenario
            .findByIdAndUpdate(threatScenarioId, { $set: req.body })
            .exec((err, threatScenarioDetails) => {
                 if (err) res.status(500).json({message : err})
                 res.status(200).json({ message: "threat scenarioId updated"});
            })
       },
       delete: (req, res)=>{
            const threatScenarioId = req.params.id;
            ThreatScenario
            .findByIdAndUpdate(threatScenarioId, { $set: { is_active: false}})
            .exec((err, threatScenarioDetails) => {
                 if (err) res.status(500).json({message : err})
            
                 res.status(200).json({ message: "threat scenarioId Deleted"});
             })
       }
}